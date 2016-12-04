/**
 * Returns a handler which will open a new window when activated.
 */
var clickHandler = function (e) {

    var new_page = 'report.html?id=';

    // TODO: Convert to promises
    //
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(sel) {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

            var partial = {
                sourceUrl: tabs[0].url,
                text: sel[0],
                reportedBy: 'test'
            };

            $.ajax({
                type: "POST",
                url: "http://localhost:3000/api/partial",
                data: partial,
                dataType: 'json',
                success: function(result) {
                    var url = new_page + result.id;
                    chrome.windows.create({url: url, width: 800, height: 600})
                },
                error: function(request, status, error) {
                    alert("Error " + request.responseText + "Status: " + status);
                }
            });

        });
    });
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

