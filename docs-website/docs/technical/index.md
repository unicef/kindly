---
sidebar_position: 3
---

# Index of Useful Code
An index of useful and noteworthy code in the repository. For future developers and contributors to get an overview of specific code which can be reused, and to document the technical growth of Kindly.

## API

## Scripts

### Github Workflow: accessing protected Google Sheets
Found in [update-dataset workflow](https://github.com/unicef/kindly/tree/main/.github/workflows/update-dataset.yml)
```
- id: 'auth'
  name: 'Authenticate to Google Cloud'
  uses: 'google-github-actions/auth@v0'
  with:
    create_credentials_file: true
    workload_identity_provider: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
    service_account:  ${{ secrets.GOOGLE_SERVICE_ACCOUNT }}

- name: 'Run trainingData.js script'
  id: 'results'
  run: |
    cd client
    npm i googleapis --silent
    cd scripts
    export CREDENTIALS_PATH=${{ steps.auth.outputs.credentials_file_path }}
    ...
    node trainingData.js
```
The ['google-github-actions/auth@v0](https://github.com/google-github-actions/auth) action is used to establish authorization to Google Cloud for this workflow. It makes use of authentication via the Workload Identity Federation, which establishes trust without needing a long-lived service account key. In order to set this up, a Google Service Account and a Google Workload Identity Provider for the project were set up on the Google Cloud dashboard and configured to exchange a GitHub Actions OIDC token. `create_credentials_file` is set to true to automatically generate a new credentials file each time the action runs, instead of saving the config file from the Google Dashboard.

The `Run trainingData.js script` step makes use of the credentials created in the first step to set an environment variable for the node script. The [`googleapis` npm package](https://www.npmjs.com/package/googleapis) is required to access the Google Sheets API which is used in the [`trainingData.js`](https://github.com/unicef/kindly/tree/main/client/scripts/trainingData.js) script. The credentials file created in the previous step is accessed by using `${{ steps.auth.outputs.credentials_file_path }}`, as the [Google Auth action outputs the path](https://github.com/google-github-actions/auth#outputs) to the newly create file. See below for how this credentials file is used to authorize a call to the Sheets API.

### Github Workflow: CI pushing downstream on Kindly Website
Found in [`push-downstream.yml`](https://github.com/unicef/kindly-website/blob/main/.github/workflows/push-downstream.yml) in the [Kindly Website repo](https://github.com/unicef/kindly-website).
```
jobs:
  push_downstream:
    runs-on: ubuntu-latest
    # Only to be run on commits to main branch AND when in the upstream repository
    if: github.ref == 'refs/heads/main' && github.repository == 'unicef/kindly-website'

    steps:
      # Checkout downstream repo at lacabra/kindly-website
      - uses: actions/checkout@v2
        with: 
          repository: lacabra/kindly-website
          token: ${{ secrets.LACABRA_TOKEN }}  # Personal Access Token with workflow scope

      - name: fetch and push
        run: |
          # Set upstream to this repository
          git remote add upstream https://github.com/${GITHUB_REPOSITORY}

          # Verify upstream is correct, you should see the URL for the upstream fetch and push 
          git remote -v

          # Get all recent branches and commits from the upstream
          git fetch upstream

          # Make sure we are on the main branch
          git checkout main

          # Merge the branches and commits from the upstream
          git merge upstream/main

          # helpful for debugging
          git show-ref

          # Push changes to main branch of downstream repo. This works because we have
          # checked out the repo with actions/checkout@v2 and the right Personal Access Token
          git push origin main

```

### NodeJS: authorizing Google API
Found in [`trainingData.js`](https://github.com/unicef/kindly/tree/main/client/scripts/trainingData.js)
```
const { google } = require('googleapis')
...
const credentialsPath = process.env.CREDENTIALS_PATH

async function main () {
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const authClient = await auth.getClient();

  const request = {
    ...
    auth: authClient,
  }
  ...
}
```
This NodeJS script process the data from the Google Sheets Output File (see [Google Apps Scripts](https://github.com/unicef/kindly/blob/main/scripts/OutputFile.gs)). To access the Google API authorization needs to be provided. The first steps to this are set up in the workflow as described [above](#Github_Workflow:_accessing_protected_Google_Sheets). The `CREDENTIALS_PATH` environment variable is passed as a parameter to the `google.auth.GoogleAuth` class (see [docs](https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest/google-auth-library/googleauth) for more). The `getClient()` method returns the auth token needed to authorize the request to the Sheets API.

### Google Apps Script: altering and moving data between sheets
Found in [IntakeToOutput.gs](https://github.com/unicef/kindly/blob/main/scripts/IntakeToOutput.gs).
```
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
  ...
}
```
This script in Google Apps Scripts iterates through the rows of the intake Google Sheet, transforms the information into a form which will be friendly for machine learning training, and adds it to the Output Sheet, to be stored before moving to the Github Repo (see [Github Workflow: accessing protected Google Sheets](#Github_Workflow:_accessing_protected_Google_Sheets)). Rows are only processed if they've been reviewed, and are deleted once the information has been added to the array of the new training data. The new training data is added to the output sheet in a batch to avoid multiple calls from each iteration in order to improve performance. Take note of the Google Sheet API [docs](https://developers.google.com/sheets/api/reference/rest) for the methods used and what they return.
