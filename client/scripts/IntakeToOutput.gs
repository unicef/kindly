// Google Apps Script to move data from the intake sheet to the output sheet once data has been anonymised
// If contributing, ask admin for `SpreadsheetId`, `IntakeSheet` and `OutputSheet`

var activeSpreadsheet = SpreadsheetApp.openById("SpreadsheetId")

function intakeToOutput(){
  var bullying = 'yes';
  var not_bullying = 'no';
  var ss = activeSpreadsheet.getSheetByName('IntakeSheet');
  var targetSheet = activeSpreadsheet.getSheetByName('OutputSheet');
  var rows = ss.getDataRange().getValues();
  var headers = rows.shift();
  var nextRow = targetSheet.getLastRow() + 1;
  var endRow = ss.getLastRow();
  var newValues = [];
  
  try {
    for (var row = endRow; row >= 1; row-- ) {
      var reviewedRow = ss.getRange(row, 1, 1, 4);
      var reviewedValues = reviewedRow.getValues()[0];
      if (reviewedValues[3]) {
        if (reviewedValues[2] == bullying) {
          var intent = 1;
        } else if (reviewedValues[2] == not_bullying) {
          var intent = 0;
        } else if (reviewedValues[2] != not_bullying || bullying) {
          continue;
        }
        newValues.push([intent, reviewedValues[1]]);
        ss.deleteRow(row)
      }
    }   
    targetSheet.getRange(nextRow, 1, newValues.length, 2).setValues(newValues);
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e, 'test':true }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
