---
sidebar_position: 3
---

# Index of Useful Code
An index of useful and noteworthy code in the repository. For future developers and contributors to get an overview of specific code which can be reused, and to document the technical growth of Kindly.

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
    export SPREADSHEET_RANGE=${{ secrets.SPREADSHEET_RANGE }}
    export SPREADSHEET_ID=${{ secrets.SPREADSHEET_ID }}
    node trainingData.js
```
The ['google-github-actions/auth@v0](https://github.com/google-github-actions/auth) action is used to establish authorization to Google Cloud for this workflow. It makes use of authentication via the Workload Identity Federation, which establishes trust without needing a long-lived service account key. In order to set this up, a Google Service Account and a Google Workload Identity Provider for the project were set up on the Google Cloud dashboard and configured to exchange a GitHub Actions OIDC token. `create_credentials_file` is set to true to automatically generate a new credentials file each time the action runs, instead of saving the config file from the Google Dashboard.

The `Run trainingData.js script` step makes use of the credentials created in the first step to set environment variables for the node script. The [`googleapis` npm package](https://www.npmjs.com/package/googleapis) is required to access the Google Sheets API which is used in the [`trainingData.js`](https://github.com/unicef/kindly/tree/main/client/scripts/trainingData.js) script. The credentials file created in the previous step is accessed by using `${{ steps.auth.outputs.credentials_file_path }}`, as the [Google Auth action outputs the path](https://github.com/google-github-actions/auth#outputs) to the newly create file. See below for how this credentials file is used to authorize a call to the Sheets API.

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
This NodeJS script process the data from the Google Sheets Output File (see [Google Apps Scripts]()). To access the Google API authorization needs to be provided. The first steps to this are set up in the workflow as described [above](#Github_Workflow:_accessing_protected_Google_Sheets). The `CREDENTIALS_PATH` environment variable is passed as a parameter to the `google.auth.GoogleAuth` class (see [docs](https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest/google-auth-library/googleauth) for more). The `getClient()` method returns the auth token needed to authorize the request to the Sheets API.

### Google Apps Script: altering and moving data between sheets