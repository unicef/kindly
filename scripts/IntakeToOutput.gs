// Google Apps Script to move data from the intake sheet to the output sheet once data has been anonymised
// If contributing, ask admin for `SpreadsheetId`, `IntakeSheet` and `OutputSheet`

var activeSpreadsheet = SpreadsheetApp.openById("SpreadsheetId")

function intakeToOutput(){
  var bullying = 'yes';
  var not_bullying = 'no';
  var ss = activeSpreadsheet.getSheetByName('IntakeSheet');
  var targetSheet = activeSpreadsheet.getSheetByName('OutputSheet');
  var nextRow = targetSheet.getLastRow() + 1;
  var endRow = ss.getLastRow();
  var newValues = [];
  
  try {
    for (var row = endRow; row >= 1; row-- ) {
      var reviewedRow = ss.getRange(row, 1, 1, 4);
      var reviewedValues = reviewedRow.getValues()[0];
      if (reviewedValues[3]) { // if row has been reviewed
        // bulling = 1 and not_bulling = 0. Skipping maybe for now
        if (reviewedValues[2] == bullying) {
          var intent = 1;
        } else if (reviewedValues[2] == not_bullying) {
          var intent = 0;
        } else if (reviewedValues[2] != not_bullying || bullying) {
          continue;
        }
        newValues.push([intent, reviewedValues[1]]);
        ss.deleteRow(row) // delete each row from IntakeSheet 
      }
    }   
    targetSheet.getRange(nextRow, 1, newValues.length, 2).setValues(newValues); // add new phrases to OutputSheet in a batch to avoid multiple calls from each iteration
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e, 'test':true }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
