# survey-response-browser

Final goal: Web app for browsing responses of a Google Form survey

Current progress: Web app that converts a spreadsheet of responses into a page of text that's easy to read and/or print.

## Usage

In your favorite terminal shell:

```bash
npm install
npm start
open http://localhost:3000
```

... then:

1. share the google spreadsheet containing the survey responses with `sample-data@survey-response-browser.iam.gserviceaccount.com` (read only)
2. identify the unique identifier of your spreadsheet, from its URL (e.g. `1Mfelh98MMmIAqusHi0u2ugoZWGhSjxnMI2GFVoVrRGo`)
3. append that identifier to the URL above, in order to display responses. (e.g. `http://localhost:3000/1Mfelh98MMmIAqusHi0u2ugoZWGhSjxnMI2GFVoVrRGo`)
