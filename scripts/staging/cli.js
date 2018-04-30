'use strict';

/**
 * Add staging to help
 */
module.exports = function(hexo){

    var stagings = [];

    if(undefined !== hexo.config.stagings){
        for(var stagingName in hexo.config.stagings){
            stagings.push(stagingName);
        }
    }

    if(0 === stagings.length){
        return;
    }
    var cli = hexo.extend.console.store;

    cli.config.options.arguments = [
        { name: '--staging', desc: 'Define staging [' + stagings.join('|') + ']' }
    ];

    cli.deploy.options.arguments = [
        { name: '--staging', desc: 'Define staging [' + stagings.join('|') + ']' }
    ];

    cli.generate.options.arguments = [
        { name: '--staging', desc: 'Define staging [' + stagings.join('|') + ']' }
    ];
};
