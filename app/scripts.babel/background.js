// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': 'chrome-distiller://'+generateUUID()+'/?time='+getTime()+'&url='+encodeURI(tab.url)});
});

function generateUUID(){
  var d = getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function getTime(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }

    return d;
}

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === 'open_new_tab' ) {
      chrome.tabs.create({'url': request.url});
    }
  }
);{}