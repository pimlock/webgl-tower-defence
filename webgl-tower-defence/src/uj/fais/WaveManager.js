dojo.provide('uj.fais.WaveManager');

uj.fais.WaveManager = function() {
    var waves = [];
    var currentWaveIndex = 0;
    var currentWave = null;
    var isWaveInProgress = false;

    var mediator = uj.fais.Mediator.getInstance();

    this.sendNextWave = function() {
        if (!isWaveInProgress && currentWaveIndex < waves.length) {
            currentWave = waves[currentWaveIndex++];
            isWaveInProgress = currentWave.start();
        }
    };

    this.handleWavesProgress = function() {
        if (isWaveInProgress) {
            isWaveInProgress = currentWave.handleWave();
            if (!isWaveInProgress) mediator.waveEnd();
        }
    };

    this.addWave = function(wave) {
        waves.push(wave);
    };

    this.resetAllWaves = function() {
        for (var i = 0; i < waves.length; i++) {
            waves[i].reset();
        }
        currentWaveIndex = 0;
        currentWave = null;
        isWaveInProgress = false;
    };

    this.getCurrentWave = function() {
        return currentWave;
    };

    // construct
    mediator.set('waveManager', this);
};
