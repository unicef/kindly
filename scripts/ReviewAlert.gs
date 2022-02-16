// Google Apps Script to send an email to review the data once a certain threshold is reached
// If contributing, ask admin for `IntakeSheet` and `CounterCell`

function reviewAlert() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(IntakeSheet);
  var counterCell = sheet.getRange(counterCell)
  var counterValue = counterCell.getValue().toString();

  var recipients = " ";

  var subject = 'Time to review the Kindly contribution Intake Sheet';
  var body = "We've reached " + counterValue + " new contributions! Visit " + ss.getUrl() + " to review and anonymize the new data.";
  MailApp.sendEmail(recipients, subject, body);
  counterCell.setValue(0);
}
