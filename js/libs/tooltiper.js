// This is a personal study about prototypical inheritance in JavaScript
// I'm setting the prototype of the constructor, so my methods are shared

(function(global) {
    
    var Tooltiper = function(pageX, pageY, message, identifier) {
        // This is calling the actual constructor
        return new Tooltiper.init(pageX, pageY, message);
    }

    // This is the actual constructor
    Tooltiper.init = function(pageX, pageY, message, identifier) {
        this.identifier = identifier || 'tooltip';
        this.pageX = pageX || null,
        this.pageY = pageY || null,
        this.message = message || ''
    }

    // Adding methods and properties to the prototype
    Tooltiper.prototype = {
        tempTooltip: '',
        create: function(message) {
            var tt = document.createElement('div');
            tt.className = 'tooltip-hover';
            tt.innerText = this.message = message;
            this.tempTooltip = tt;
            document.body.appendChild(tt);
            logMessage('[tooltip created]\n' + tt.outerHTML);
            return tt;
        },
        remove: function() {            
            tooltip.tempTooltip.remove();
            tooltip.message = this.message = '';
            this.tempTooltip = '';
            logMessage('[tooltip removed]');
        }
    };

    // Setting the prototype of the constructor
    Tooltiper.init.prototype = Tooltiper.prototype;

    // Exposing the function to the global object ('window' passed in the IIFE)
    global.Tooltiper = Tooltiper;

    var tooltip = Tooltiper();

    var tooltips = document.querySelectorAll('.tooltip');
    var interval;

    tooltips.forEach(function(tooltipHandler) {
        tooltipHandler.addEventListener('mouseenter', function(e) {
            var message = this.getAttribute('data-message');
            if (!message) {                
                logMessage('"data-message" attribute required!', true);                
            }
            tooltip.create(message);            
        });
        tooltipHandler.addEventListener('mouseleave', function() {
            if (!tooltip.tempTooltip) {
                return;
            }
            tooltip.remove();
            clearTimeout(interval);
            interval = null;
        });
        tooltipHandler.addEventListener('mousemove', function(e) {
            if (!tooltip.tempTooltip) {
                return;
            }
            tooltip.pageY = e.pageY;
            tooltip.pageX = e.pageX;
            tooltip.tempTooltip.style.top = tooltip.pageY + 'px';
            tooltip.tempTooltip.style.left = tooltip.pageX + 'px';            
            if (!interval) {
                interval = setInterval(function() {
                    logMessage('[hovering]');
                    clearTimeout(interval);
                    interval = null;
                }, 200);       
            }     
        });
    });
}(window));

(function(global) {
    var debug = document.querySelector('.debug tbody');
    // logs message to the screen and console
    function logMessage(message, throwError) {     
        debugMsg = document.createElement('tr');
        debugMsgTD = document.createElement('td');  
        debugMsgTD.innerText = message;
        debugMsg.appendChild(debugMsgTD);
        debug.insertBefore(debugMsg, debug.childNodes[0]);
        if (throwError) {
            throw "[Error]: " + message;
        } else {
            console.log(message);
        }   
    }
    // Exposing the function to the global object ('window' passed in the IIFE)
    global.logMessage = logMessage;
}(window));