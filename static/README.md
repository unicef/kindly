# Kindly for Static Site

The contents of this folder are meant to provide the necessary elements to add a demo of Kindly into an existing website using only statically-generated code as follows. Refer to [index.html](index.html) for the actual code. A high-level description of the various elements is included below for reference.

## HTML code

The HTML code has three basic elements:

```html
<textarea id="kindlyInput" maxlength="256"></textarea>
<button onclick="runKindly()">Submit</button>
<div id="kindlyOutput"></div>
```

* A `textarea` element that allows the user to provide input
* A `button` element to process the user's input
* A `div` element that will first get updated with a spinner while the request is processing, and will later contain the output of Kindly

## Javascript code

All the necessary code is included in [index.html](index.html) between the `<script></script>` tags. Either include it as is in the header or body of the desired page, or save it into another `.js` file and provide a link to that file.

## CSS

A CSS fragment is included to provide a lightweight implementation of a spinner to display while the request is being processed. If another spinner is available, you can exclude that CSS, and use the one available instead.
