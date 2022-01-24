// Google Apps Script to process data sent to Google Sheets from the Contribution form on https://kindly.unicef.io/contribute
// If contributing, ask admin for `SpreadsheetId`, `IntakeSheet` and `OutputSheet`

var sheetName = 'OutputSheet'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPostOutput (request){
  console.log(request);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)
    
    var data = getSheetData(sheet)

    var outputString =''

    data.forEach((row)=>{
        outputString += row.toString() + '/n';
    });

    console.log(outputString)

    return ContentService.createTextOutput(outputstring).setMimeType(ContentService.MimeType.TEXT);

  }
  catch (e){
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e, 'test':true }))
      .setMimeType(ContentService.MimeType.JSON)
  }
};

function getSheetData(sheetObject) {
   var sh = sheetObject;
   return sh.getDataRange().getValues();
}
