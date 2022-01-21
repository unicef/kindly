# Google Apps Scripts
Copies of scripts from the Kindly Google Apps Scripts which interact with the Google Spreadsheets where training data is stored.

**[OutputFile](scripts/OutputFile.gs)**
This script processes the data sent to Google Sheets from the Contribution form on the [Kindly website](https://kindly.unicef.io/contribute).
The contribution form sends the text, and 'yes' or 'no' depending on whether cyberbullying was detected. The script inserts the timestamp, data validation with a dropdown to choose 'yes', 'no', or 'maybe', and a checkbox.
Reviewers who anonymise the incoming data can also change the `intent` result if they find that it has been incorrectly categorised. We have added a 'maybe' option to account for instances where context might play a part in whether the text is considered cyberbullying or not.
Once the reviewer has anonymised the data and confirmed the other inputs are correct, then they can check the `reviewed` box. 

**[IntakeToOutput](scripts/IntakeToOutput.gs)**
This script moves the reviewed data from the intake sheet to the output sheet once it has been anonymised and checked.
The intake sheet rows are iterated over in reverse from the last row to the first row. If the row has been reviwed (`reviewedValues[3]`) then the `intent` result is codified into either `1` (bullying detected) or `0`(no bullying detected). At this point a 'maybe' result is skipped over until context awareness is implemented.
Each reviwed phrase and intent are then added to an array to collect a batch of the new data. The reviewed row is then deleted from the intake sheet. 
The new batch of training data is then added to the output sheet in one go to improve performance instead of each iteration.

The data which has been added output sheet will then be processed by the [update-dataset Github Action](.github/workflows/update-dataset.yml) once a day.
