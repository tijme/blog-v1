'use strict';

// add tag
hexo.extend.helper.register('is_staging', function(stagingName) {
    if(undefined === this.config.staging){
        return false;
    }

    return (stagingName === this.config.staging);
});

/**
 * get staging name from config or argv
 */
var getStagingName = function(){

    var stagingName = false;

    for(var i = 0, x = process.argv.length; i < x; i += 1){
        if('--staging' === process.argv[i] && undefined !== process.argv[(i + 1)]){
            stagingName = process.argv[(i + 1)];
            break;
        }
    }

    // no staging given by cli parameter
    if(false === stagingName){
        return false;
    }

    // stagib given, but not found in config
    if(undefined === hexo.config.stagings[stagingName]){
        return false;
    }

    return stagingName;

};

/**
 * overwrite config by active staging
 */
var changeConfig = function(stagingName){
    hexo.config.staging = stagingName;
    var staging = hexo.config.stagings[stagingName];

    for(var key in staging){
        if(undefined === hexo.config[key]){
            continue;
        }
        hexo.config[key] = staging[key];
    }
};


/**
 * if staging is defined, change the config
 */
if(undefined !== hexo.config.stagings){
    require('./staging/cli.js')(hexo);

    var stagingName = getStagingName();

    changeConfig(stagingName);
}

