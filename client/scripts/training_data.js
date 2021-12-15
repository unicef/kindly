/* eslint-disable no-undef */
/* This script is what was used to extract data from the training_data.txt file where updated anonymised training data is */

const fs = require('fs')

const { google } = require('googleapis')
const sheets = google.sheets('v4')

const trainingDataFile = '../modeling/dataset/training_data.txt'

async function main () {
  const authClient = await authorize()
  const request = {
    // spreadsheetId: process.env.SPREADSHEET_ID,
    // range: [process.env.SPREADSHEET_RANGE],

    auth: authClient
  }
  try {
    const response = (await sheets.spreadsheets.values.get(request)).data

    const data = response
    const phrases = data.values
    let resultString = ''
    for (value in phrases) {
      resultString = '[' + phrases[value][1] + '],' + ' [' + phrases[value][0] + ']\n'
      fs.writeFileSync(trainingDataFile, resultString, { flag: 'a+' }, err => {
        console.log('Something went wrong while writing to file ', err)
      })
    }
  } catch (err) {
    console.error(err)
  }
  try {
    const response = (await sheets.spreadsheets.values.clear(request)).data;
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
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
