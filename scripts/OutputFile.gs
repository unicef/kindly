// Google Apps Script to process data sent to Google Sheets from the Contribution form on https://kindly.unicef.io/contribute
// If contributing, ask admin for `SpreadsheetId`, `IntakeSheet`, `OutputSheet` and `CounterCell`
// example: `e = {parameter:{"text": "You suck", "intent": "yes", "row": 'undefined'}}`

var sheetName = 'IntakeSheet'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    // get the sheet's headers (timestamp, text etc)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    // rule to create data validation for dropdown yes/no/maybe for bullying detected
    var dropdownRule = SpreadsheetApp.newDataValidation().requireValueInList(['yes', 'no', 'maybe'], true).build()

    console.log(e)

    if("row" in e.parameter && e.parameter['row']!=='undefined'){
      nextRow = e.parameter['row']
    }

    // sets the value for the cell under the 'timestamp' header to the Date
    // else sets to the value corresponding to the other headers (`text`, `intent`)
    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    // add the new input into the rest of the cells
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // adds data validation cell to row with dropdownRule
    sheet.getRange(nextRow, 3).setDataValidation(dropdownRule);

    // adds checkbox for reviewed column
    sheet.getRange(nextRow, 4).insertCheckboxes();

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e, 'test':true }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}