function save_options() {
    var enable = document.getElementById('enable').checked;
    chrome.storage.sync.set({
        enable: enable
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Settings saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        enable: true
    }, function (items) {
        document.getElementById('enable').checked = items.enable;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
