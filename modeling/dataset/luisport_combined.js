/*
This script is what was used to extract data from the kindly_luis_export.json file, combined test and label as 
`{
    "text": "[text]",
    "intent": [0 or 1]
}`
*/

const fs = require('fs')
let louis = require('./kindly_luis_export.json')
let utterances = louis.utterances;
let resultString = ''
for (index in utterances){
    ignore = ["ignore", "none"]
    label = (ignore.includes(utterances[index].intent)) ? 0 : 1;
    var data = fs.readFileSync('modeling/dataset/training_data.json')
    var fileContents = JSON.parse(data)
    let result = {
        "text": utterances[index].text,
        "intent": label
    }
    fileContents.push(result)
    var newData = JSON.stringify(fileContents, null, 4)
    fs.writeFileSync('modeling/dataset/training_data.json', newData, err => {
        if(err) throw err;
        console.log("new data added");
    })
}
