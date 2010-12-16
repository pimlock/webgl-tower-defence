dojo.provide("uj.fais.WebGL");

uj.fais.WebGL = function(canvasId) {
    var gl;
    var triangleVertexPositionBuffer;
    var squareVertexPositionBuffer;
    var shaderProgram;
    var mvMatrix;
    var pMatrix;
    
    var canvas = document.getElementById(canvasId);

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch(e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }

    function initShaders() {
        var fragmentShader = new uj.fais.WebGL.Shader(gl, "fragment-test.txt", gl.FRAGMENT_SHADER).getShader();
        var vertexShader = new uj.fais.WebGL.Shader(gl, "vertex-test.txt", gl.VERTEX_SHADER).getShader();

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }

    function loadIdentity() {
        mvMatrix = Matrix.I(4);
    }

    function multMatrix(m) {
        mvMatrix = mvMatrix.x(m);
    }

    function mvTranslate(v) {
        var m = Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4();
        multMatrix(m);
    }

    function perspective(fovy, aspect, znear, zfar) {
        pMatrix = makePerspective(fovy, aspect, znear, zfar);
    }

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, new Float32Array(pMatrix.flatten()));
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, new Float32Array(mvMatrix.flatten()));
    }

    function initBuffers() {
        triangleVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        var vertices = [
            0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
            1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        triangleVertexPositionBuffer.itemSize = 3;
        triangleVertexPositionBuffer.numItems = 3;

        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
            1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
            1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 4;
    }

    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
        loadIdentity();

        mvTranslate([-1.5, 0.0, -7.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

        mvTranslate([3.0, 0.0, 0.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
    }

    this.init = function() {
        initGL(canvas);
        initShaders();
        initBuffers();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        gl.clearDepth(1.0);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        setInterval(drawScene, 15);
    };

    this.getWebGL = function() {
        return gl;
    }
};

uj.fais.WebGL.start = function(canvasId) {
    if (Modernizr.webgl) {
        var webGL = new uj.fais.WebGL(canvasId);
        webGL.init();

        return webGL;
    }
};

uj.fais.WebGL.Shader = function(gl, shaderId, shaderType) {
    var shaderSource = null;
    var shader = null;

    function initShaderSource() {
        dojo.xhrGet({
            url: "src/shaders/" + shaderId,
            handleAs: "text",
            sync: true,
            load: function(data) {
                shaderSource = data;
            }
        });
    }

    function loadShader() {
        initShaderSource();
        if (!shaderSource) {
            return;
        }

        shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            shader = null;
        }
    }

    this.getShader = function() {
        if (shader === null) {
            loadShader();
        }
        return shader;
    }
};