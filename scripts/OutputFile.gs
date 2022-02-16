// Google Apps Script to process data sent to Google Sheets from the Contribution form on https://kindly.unicef.io/contribute
// If contributing, ask admin for `SpreadsheetId`, `IntakeSheet`, `OutputSheet` and `CounterCell`
// example: `e = {parameter:{"text": "You suck", "intent": "yes", "row": 'undefined'}}`

var scriptProp = PropertiesService.getScriptProperties()
var sheetID = "GOOGLE SHEET ID HERE"

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.openById(sheetID)
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doGet() {
  return ContentService.createTextOutput('Kindly Data Intake Script!');
}

function doPost (e) {
  //var lock = LockService.getDocumentLock()
  //lock.tryLock(10000)
  console.log(e)
  try {
    
    var doc = SpreadsheetApp.openById(sheetID)
    var sheet = doc.getSheetByName('Sheet1')
  
    console.log('Debug statement')
    var nextRow = sheet.getLastRow() + 1
    // cell with counter to keep track of number of new contributions (resets once review email has been sent)
    
    var dropdownRule = SpreadsheetApp.newDataValidation().requireValueInList(['yes', 'no', 'maybe'], true).build()
    // rule to create data validation for dropdown yes/no/maybe for bullying detected
    
    var counterCell = sheet.getRange("E1")
    var counterValue = counterCell.getValue()
    var counter = 20
    
    var date = new Date();
    var newRow = [date, e.parameter["text"], e.parameter["intent"]]
    
    // Updating row if row number is present in the payload, elase append new row
    if(e.parameter['row']){
      console.log('row is present')
      sheet.getRange(e.parameter['row'], 1, 1, newRow.length).setValues([newRow]);
    }
    else{
      //Appends the data to the sheet as a new entry
      sheet.appendRow(newRow);

      // adds data validation cell to row with dropdownRule
      sheet.getRange(nextRow, 3).setDataValidation(dropdownRule);

      // adds checkbox for reviewed column
      sheet.getRange(nextRow, 4).insertCheckboxes();
    }
    
    // Increments the counter by one for each new row added
    counterCell.setValue(counterValue + 1);

    // if the counterValue hits the specified amount, triggers reviewAlert() which sends an email and resets the counter
    if(counterValue >= counter){
      reviewAlert()
    }

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
    //lock.releaseLock()
  }
}
