var helpers = helpers || {};

/**
 * Clear of the styles in the parent and children
 * of the passed selector
 * @param  String selector Selector to remove
 */
helpers.clear_imported_external_styles = function(domain, interval, timeToWait){
    var DEFAULT_WAIT_TIMES = 1000; //100s 
    var DEFAULT_INTERVAL = 100; 
    var timer = (interval === undefined)? DEFAULT_INTERVAL : 10;
    var times = 0;
    timeToWait = (Math.floor(timeToWait) == timeToWait && $.isNumeric(timeToWait))? timeToWait : DEFAULT_WAIT_TIMES;

    //Create an interval to recheck to see if the style sheet dynamically appears
    var waitToAppear = setInterval(function () {
        var selector = $('link[rel=stylesheet][href^="'+ domain +'"]');
        console.log(timeToWait);
        times++;
        if(selector.length){
            $('link[rel=stylesheet][href^="'+ domain +'"]').remove();
            clearTimeout(waitToAppear);
        }
        else{
            console.log("Not Removed");

            //After so many iterations clear the timeout
            if(timer >= timeToWait){
                clearTimeout(waitToAppear);
                console.log("Max");
            }
        }
        
    }, timer);
    
    
};
