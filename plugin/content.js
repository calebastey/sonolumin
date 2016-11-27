// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

        var domInfo = {
            sourceUrl: "SOURCE URL",
            text: "la da la da la da"
        };

        // Directly respond to the sender (popup),
        // through the specified callback */
        response(domInfo);
    }
});