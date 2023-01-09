// TO DO: Implement configurable slider
var warn_threshold = 0.8;
var notice_threshold = 0.5;

/* 
 * Initializes event listens for elements
 *
 **/
function init() {
    // fields to target
    target_fields = [
        'div[role="textbox"]',
        'textarea[placeholder="Message..."]',
        'textarea[placeholder="Add a comment…"]'
    ];
    // add event listeners to each selector, which may be multiple elements
    target_fields.forEach((field) => {
        var elements = document.querySelectorAll(field);
        elements.forEach((element) => {
            if (element.getAttribute('data-kindly-listener') !== 'true') {
                element.addEventListener("keydown", function () {
                    analyzeField(element);
                });
                element.setAttribute('data-kindly-listener', 'true');
                // add status indicator
                add_status(element);
            }
        });
    });

}

/*
 * Check if the number of words is num greater or less than previously
 * @param {string} content - The content of the field to be analyzed
 * @param {element} element - The element to be analyzed
 * @param {int} num - The number of words changed to trigger
 */
function wordChanged(content, element, num) {
    var word_count = content.split(/[\s\n]+/).length;
    var prev_word_count = element.getAttribute("data-kindly-count");
    if (prev_word_count == null) {
        prev_word_count = 0;
    }
    if (Math.abs(word_count - prev_word_count) > num) {
        element.setAttribute("data-kindly-count", word_count);
        return true;
    }
}

/*
 * Analyzes and displays a message for the field if content is flagged
 * @param {element} element - The element to be analyzed
 **/

// debug
// function analyzeField(element) {

//     var content = extractText(element);
//     if (wordChanged(content, element, 5)) {
//         fetch('https://kindly-api.azurewebsites.net/detect', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 text: content
//             })
//         }).then(res => res.json())
//             .then((res) => {
//                 if (res["confidence"] > threshold) {
//                     showToxic(element, true);
//                 } else {
//                     showToxic(element, false);
//                 }
//             });
//     }
// }

function analyzeField(element) {

    var content = extractText(element);
    console.log(content);
    if (wordChanged(content, element, 0)) {
        fetch('https://api.moderatehatespeech.com/api/v1/twitter/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: content
            })
        }).then(res => res.json())
            .then((res) => {
                if (res["confidence"] > warn_threshold && res["class"] == "flag") {
                    update_indicator(element, res["confidence"], "warn");
                    showToxic(element, true);
                } else if (res["confidence"] > notice_threshold && res["class"] == "flag") {
                    update_indicator(element, res["confidence"], "notice");
                    showToxic(element, false);
                } else {
                    update_indicator(element, res["confidence"], "safe");
                    showToxic(element, false);
                }
            });
    }
}

/*
 * Report a false positive
 * @param {element} element - The element to be analyzed
 **/
function report_fp(element) {
    var content = extractText(element);
    fetch('https://api.moderatehatespeech.com/api/v1/report-kindly/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: content,
            intended: 2
        })
    }).then(res => res.json());    
}

/*
 * Extracts text from a given field
 * @param {element} element - The element to be analyzed
 * @return {string} - The text content of the field
 * 
 **/
function extractText(element) {
    // support multiple types of input fields
    if (element.value) {
        return element.value;
    } else {
        return element.innerText;
    }
}

/* 
 * Alerts the user that the field is toxic
 * @param {element} element - The element to render the notification in
 * @param {boolean} status - Show or hide the notification
 **/
function showToxic(element, status) {
    if (status) {
        var notification = element.parentNode.querySelector(".kindly-notification");
        if (notification) 
            return;
            
        var notification = document.createElement("div");
        notification.setAttribute("class", "kindly-notification");
        notification.setAttribute("contenteditable", "false");
        notification.innerHTML = 'This contains content that could potentially be hurtful. Maybe reconsider before sending? <span class="kindly-report">(Report Error)</span>';
        var close = document.createElement("div");
        close.setAttribute("class", "kindly-close");
        close.innerHTML = "⤬";
        close.addEventListener("click", function () {
            showToxic(element, false);
        });
        notification.querySelector(".kindly-report").addEventListener("click", function (e) { e.target.innerHTML = "(Reported Logged)"; report_fp(element) }, { once: true });
        notification.appendChild(close);
        element.parentNode.insertBefore(notification, element.nextSibling);
        if (element.parentNode.offsetHeight < 90){
            var mh = element.offsetHeight + notification.offsetHeight + 15;
            element.parentNode.style.minHeight = mh + "px";
            element.style.minHeight = mh - 15 + "px";
        }
    } else {
        var notification = element.parentNode.querySelector(".kindly-notification");
        if (notification) {
            notification.parentNode.removeChild(notification);
        }
        element.parentNode.style.minHeight = null;
        element.style.minHeight = null;
    }
}

/* 
 * Adds a status indicator to the field and a status message
 * @param {element} element - The element to render the notification in
 **/
function add_status(element) {
    var status = document.createElement("div");
    status.setAttribute("class", "kindly-status-indicator");
    // get width of element and set the "left" style property of status to be width - 35 and right to be zero
    var width = element.offsetWidth;
    status.style.left = width - 15 + "px";
    element.parentNode.insertBefore(status, element.nextSibling);
    var message = document.createElement("div");
    message.setAttribute("class", "kindly-status-message");
    message.innerHTML = '<span class="kindly-indicator-message">Looks Clean!</span><span class="kindly-conf-value">100% confident</span>';
    status.appendChild(message);
}

/* 
 * Updates the status indicator and message
 * @param {element} element - The element to render the notification in
 * @param {float} confidence - confidence level of the field
 * @param {string} status - warn/notice/clean
 **/
function update_indicator(element, confidence, status) {
    var indicator = element.parentNode.querySelector(".kindly-status-indicator");
    var message = indicator.querySelector(".kindly-indicator-message");
    var mblock = indicator.querySelector(".kindly-status-message");
    var conf = indicator.querySelector(".kindly-conf-value");
    if (status == "notice") {
        indicator.style.backgroundColor = "#ec6800";
        mblock.style.backgroundColor = "#ec6800";
        indicator.style.boxShadow = "0 0 2px 0 #ec6800";
        message.innerHTML = "Potentially Hurful";
        conf.innerHTML = Math.round(confidence * 100) + "% confident";
    } else if (status == "warn") {
        indicator.style.backgroundColor = "#ec0000";
        mblock.style.backgroundColor = "#ec0000";
        indicator.style.boxShadow = "0 0 2px 0 #ec0000";
        message.innerHTML = "Likely Hurtful";
        conf.innerHTML = Math.round(confidence * 100) + "% confident";
    } else {
        indicator.style.backgroundColor = "#4caf50";
        mblock.style.backgroundColor = "#4caf50";
        indicator.style.boxShadow = "0 0 2px 0 #4caf50";
        message.innerHTML = "Looks Clean!";
        conf.innerHTML = Math.round(confidence * 100) + "% confident";
    }
}



// for development purposes, scan every 500ms
setInterval(init, 500);