/* eslint-disable no-undef */
/* This script is what was used to extract data from the training_data.txt file where updated anonymised training data is */

const fs = require('fs')

const { google } = require('googleapis')
const sheets = google.sheets('v4')

const trainingDataFilePath = '../../modeling/dataset/training_data.json'
const trainingDataFile = require(trainingDataFilePath)
const spreadsheetId = process.env.SPREADSHEET_ID
const range = process.env.SPREADSHEET_RANGE
const credentialsPath = process.env.CREDENTIALS_PATH

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })
  const authClient = await auth.getClient()

  const request = {
    spreadsheetId: spreadsheetId,
    range: [range],
    auth: authClient,
  }
  try {
    const response = (await sheets.spreadsheets.values.get(request)).data
    const phrases = response.values

    for (value in phrases) {
      let result = {
        text: phrases[value][1],
        intent: phrases[value][0],
      }
      trainingDataFile.push(result)
    }
    let newData = JSON.stringify(trainingDataFile, null, 4)
    fs.writeFileSync(trainingDataFilePath, newData, (err) => {
      if (err) throw err
      console.log('new data added')
    })
  } catch (err) {
    console.error(err)
  }
}
main()
