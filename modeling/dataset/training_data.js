/* This script is what was used to extract data from the training_data.txt file where updated anonymised training data is */

const fs = require('fs')
let data = require('./dataset_updates.json')
let phrases = data.phrases;
let resultString = ''
for (index in phrases){
    resultString = '[' + phrases[index].intent + '],' + ' [' + phrases[index].text + ']\n'
    fs.writeFileSync('training_data.txt', resultString, { flag: 'a+' }, err => {
        console.log("Something went wrong while writing to file ",err)
    })
}
