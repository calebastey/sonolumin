/**
 * Returns a handler which will open a new window when activated.
 */
var clickHandler = function (e) {

    // The srcUrl property is only available for image elements.
    var new_page = 'report.html';

    // Create a new window to the info page.
    chrome.windows.create({url: new_page, width: 800, height: 600});
};



/**
 * Create a context menu which will only show up for highlighted text
 */
chrome.contextMenus.create({
    "title" : "Tag Conflicting Account",
    "type" : "normal",
    "contexts" : ["selection"],
    "onclick" : clickHandler
});

