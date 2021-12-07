/* This script is what was used to extract data from the kindly_luis_export.json file, combined test and label as '[text], [label_number]'*/

const fs = require('fs')
let louis = require('./kindly_luis_export.json')
let utterances = louis.utterances;
let resultString = ''
for (index in utterances){
    ignore = ["ignore", "none"]
    bully = ["bully", "insult", "teasing"]
    label = (bully.includes(utterances[index].intent)) ? '1' : '0';
    resultString = '[' + utterances[index].text + '],' + ' [' + label + ']\n'
    fs.writeFileSync('training_data.txt', resultString, { flag: 'a+' }, err => {
        console.log("Something went wrong while writing to file ",err)
    })
}