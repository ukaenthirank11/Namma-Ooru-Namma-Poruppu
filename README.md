# Plastic Awareness Website

Local first-time registration website for plastic awareness.

## Current Flow

1. First time opening the website: user registers with username, phone number, and email ID.
2. The browser stores the user locally.
3. Second time opening the website: dashboard opens directly.
4. User manually enters how many bottles were put in the dustbin.
5. Points update automatically.
6. At 500 points, the certificate unlocks and can be downloaded.

## Features

- No Google Authentication
- No Supabase SQL/database
- First-time local registration
- Username, phone, email stored in browser local storage
- Optional Google Sheets sync for name, phone, email, bottle count, and points
- Manual bottle-count submission
- 1 bottle = 10 points
- 500-point certificate unlock
- Dynamic certificate using selected username
- Tamil and English language toggle
- Awareness article in both languages
- Polluted ocean to clean ocean animation
- Mobile and desktop responsive design

## Run Locally

```bash
node serve.js
```

Open:

```text
http://127.0.0.1:4173/
```

## Reset User

Use the `Reset user` button in the header to clear local registration and start again.

## Google Sheets Sync

The target sheet is:

```text
https://docs.google.com/spreadsheets/d/1UvCv8EZvDNamZr6PB2UMamZNzBvM9DAOKnJPIGbD1nM/edit
```

To turn on live saving:

1. Open the Google Sheet.
2. Go to Extensions > Apps Script.
3. Paste the code from `google-sheet-web-app.gs`.
4. Deploy it as a Web App.
5. Set access to Anyone.
6. Copy the Web App URL.
7. Paste that URL into `GOOGLE_SHEET_WEB_APP_URL` in `app.js`.

After that, every bottle submission will append one row to `Sheet1`.
