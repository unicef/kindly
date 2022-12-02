// TO DO: Implement configurable slider
var threshold = 0.6;

/* 
 * Initializes event listens for elements
 *
 **/
function init() {
    // fields to target
    target_fields = [
        'div[role="textbox"]'
    ];

    // add event listeners to each selector, which may be multiple elements
    target_fields.forEach((field) => {
        var elements = document.querySelectorAll(field);
        elements.forEach((element) => {
            if (element.getAttribute('data-kindly-listener') !== 'true') {
                element.addEventListener("input", function () {
                    analyzeField(element);
                });
                element.setAttribute('data-kindly-listener', 'true');
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
    var word_count = content.split(" ").length;
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
    if (wordChanged(content, element, 1)) {
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
                if (res["confidence"] > threshold && res["class"] == "flag") {
                    showToxic(element, true);
                } else {
                    showToxic(element, false);
                }
            });
    }
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
        notification.innerHTML = "This content contains phrases that could potentially be hurtful. Maybe reconsider before sending? ";
        element.parentNode.insertBefore(notification, element.nextSibling);
    } else {
        var notification = element.parentNode.querySelector(".kindly-notification");
        if (notification) {
            notification.parentNode.removeChild(notification);
        }
    }
}

// for development purposes, scan every 500ms
setInterval(init, 500);