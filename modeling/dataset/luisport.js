const fs = require('fs')
let louis = require('./kindly_luis_export.json')
let utterances = louis.utterances;
let resultString = ''
for (index in utterances){
    if(utterances[index].intent != 'ignore' || utterances[index].intent != 'None'){
        resultString = utterances[index].text + '\n'
        fs.writeFileSync('offensive.txt', resultString, { flag: 'a+' }, err => {
            console.log("Something went wrong while writing to file ",err)
        })
    }
}