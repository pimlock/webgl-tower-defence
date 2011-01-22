dojo.provide('uj.fais.Audio');

uj.fais.Audio.enabled = false;

uj.fais.Audio.playSound = function(soundName) {
    if (uj.fais.Audio.enabled) {
        var soundPath = 'sound/';
        var isOgg = Modernizr.audio && Modernizr.audio.ogg;
        var fileExtension = (isOgg) ? '.ogg' : '.mp3';

        return new Audio(soundPath + soundName + fileExtension).play();
    }
};

