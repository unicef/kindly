// Google Apps Script to move data from the intake sheet to the output sheet once data has been anonymised
// If contributing, ask admin for `SpreadsheetId`, `IntakeSheet` and `OutputSheet`

var activeSpreadsheet = SpreadsheetApp.openById("SpreadsheetId")

function intakeToOutput(){
  var ss = activeSpreadsheet.getSheetByName("INTAKE SHEET NAME HERE");
  var targetSheet = activeSpreadsheet.getSheetByName("OUTPUT SHEET NAME HERE");
  var archiveSheet = activeSpreadsheet.getSheetByName("ARCHIVE SHEET NAME HERE");

  // get's the next empty row
  var nextRow = targetSheet.getLastRow() + 1;

  var endRow = ss.getLastRow();
  var newValues = [];
  var newArchives = [];

  // sets variables to process `intent` from IntakeSheet
  var bullying = 'yes';
  var not_bullying = 'no';

  try {

    // iterate over rows in reverse in IntakeSheet from endRow, to account for row deletion
    for (var row = endRow; row >= 1; row-- ) {

      var reviewedRow = ss.getRange(row, 1, 1, 5);
      var reviewedValues = reviewedRow.getValues()[0];

      // if row has been marked as reviewed
      if (reviewedValues[4]) {

        // bulling = 1 and not_bulling = 0. Skipping `maybe` for now
        if (reviewedValues[2] == bullying) {
          var intent = 1;
        } else if (reviewedValues[2] == not_bullying) {
          var intent = 0;
        } else if (reviewedValues[2] != not_bullying || bullying) {
          continue;
        }

        // new values are added to arrays in the correct format, archive with prompt
        newValues.push([intent, reviewedValues[1]]);
        newArchives.push([reviewedValues[1], intent, reviewedValues[3]])

        // delete each row from IntakeSheet
        ss.deleteRow(row)
      }
    }

    // add new phrases to Output and Archive Sheets in a batch to avoid multiple calls from each iteration
    targetSheet.getRange(nextRow, 1, newValues.length, 2).setValues(newValues);
    archiveSheet.getRange(nextRow, 1, newValues.length, 3).setValues(newArchives);
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e, 'test':true }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
