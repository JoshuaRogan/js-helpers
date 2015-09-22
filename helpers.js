var helpers = helpers || {};

/**
 * Clear all of the styles in external stylesheets from a domain
 * @param  {[type]} domain     Domain to check for
 * @param  {[type]} interval   How often to check for the domain
 * @param  {[type]} timesToWait How many times to wait max
 * @return {[type]}            [description]
 */
helpers.clear_imported_external_styles = function(domain, interval, timesToWait){
    var DEFAULT_WAIT_TIMES = 1000; //100s 
    var DEFAULT_INTERVAL = 100; 
    var timer = (interval === undefined)? DEFAULT_INTERVAL : 10;
    var times = 0;
    timesToWait = (Math.floor(timesToWait) == timesToWait && $.isNumeric(timesToWait))? timesToWait : DEFAULT_WAIT_TIMES;

    //Create an interval to recheck to see if the style sheet dynamically appears
    var waitToAppear = setInterval(function () {
        var selector = $('link[rel=stylesheet][href^="'+ domain +'"]');
        console.log(timesToWait);
        times++;
        if(selector.length){
            $('link[rel=stylesheet][href^="'+ domain +'"]').remove();
            clearTimeout(waitToAppear);
        }
        else{
            console.log("Not Removed");

            //After so many iterations clear the timeout
            if(timer >= timesToWait){
                clearTimeout(waitToAppear);
                console.log("Max");
            }
        }
        
    }, timer);
};
