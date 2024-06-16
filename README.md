# Jammming

## Overview

Front-end RESTful API app.

### Features

- Users can search for songs by song title.
- Displays information about each songs such as artist, album, title, and more.
- Users can export their custom playlists to their Spotify accounts.

### Get Jamming

To use Jammming on your local machine, follow these steps:

1. Clone the repository to your local machine using the following command:
    ```
    git clone https://github.com/your-username/jammming.git
    ```

2. Navigate to the project directory:
    ```
    cd jammming
    ```

3. Install the required dependencies by running:
    ```
    npm install
    ```

4. Open the `src/components/auth.js` file and replace the value of `clientId` with your own Spotify Client ID. You can obtain a Client ID by creating a Spotify Developer account and registering a new application.
    ```javascript
    const clientId = 'YOUR_CLIENT_ID';
    ```
5. Save the `auth.js` file and start the development server:
    ```
    npm start
    ```
6. Open your web browser and visit `http://localhost:3000` to access Jammming.

Now you can search for songs, create custom playlists, and export them to your Spotify account.

### Technologies used

- React
- HTML/CSS
- Javascript
- NPM
- Git/Github
- HTTP requests & responses
- OAUTH 2.0

### Future Work
- Create a backend using ExpressJS and deploy fully functioning app with Netlify or Vercel
- AI-powered playlist maker - recognize user's tastes and preferences to build a playlist.
- Add playback feature in app so that users can listen to the songs they are adding to their playlist