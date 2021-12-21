/* eslint-disable no-undef */
/* This script is what was used to extract data from the training_data.txt file where updated anonymised training data is */

const fs = require('fs')

const { google } = require('googleapis')
const sheets = google.sheets('v4')

const trainingDataFile = '../modeling/dataset/training_data.json'

async function main () {
  const authClient = await authorize()
  const request = {
    // spreadsheetId: process.env.SPREADSHEET_ID,
    // range: [process.env.SPREADSHEET_RANGE],

    auth: authClient
  }
  try {
    const response = (await sheets.spreadsheets.values.get(request)).data

    const phrases = response.values
    const data = fs.readFileSync(trainingDataFile)
    const fileContents = JSON.parse(data)
    for (value in phrases) {
      let result = {
        text: phrases[value][1],
        intent: phrases[value][0]
      }
      fileContents.push(result)
      let newData = JSON.stringify(fileContents, null, 4)
      fs.writeFileSync('modeling/dataset/training_data.json', newData, err => {
        if (err) throw err
        console.log('new data added')
      })
    }
  } catch (err) {
    console.error(err)
  }
  try {
    const response = (await sheets.spreadsheets.values.clear(request)).data
    console.log(JSON.stringify(response, null, 2))
  } catch (err) {
    console.error(err)
  }
}
main()

async function authorize () {
  // TODO: Change placeholder below to generate authentication credentials. See
  // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
  //
  // Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  // 'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  const authClient = null

  if (authClient == null) {
    throw Error('authentication failed')
  }

  return authClient
}
