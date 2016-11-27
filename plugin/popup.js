function setDOMInfo(info) {
    document.getElementById('sourceUrl').value = info.sourceUrl;
    document.getElementById('text').value = info.text;
}

window.addEventListener('DOMContentLoaded', function () {

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},
            setDOMInfo);
    });
});