const { clientId } = require('./keys') || ''; // YOUR CLIENT ID GOES HERE
const redirectUri = 'http://localhost:3000/login';        // your redirect URL - must be localhost URL and/or HTTPS
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';


export const AUTH = {
  getAccessToken() {
    return localStorage.getItem('access_token');
  },
  getExpiry() {
    return localStorage.getItem('expires_in');
  },
  setExpiry(expires_in) {
    localStorage.setItem('expires_in', new Date().getTime() + expires_in * 1000);
  },
  setAccessToken(access_token) {
    localStorage.setItem('access_token', access_token);
  },
  // Implicit Grant Flow
  getRedirectToSpotifyAuthorize() {
    const authUrl = new URL(authorizationEndpoint)
    const params = {
      response_type: 'token',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params);
    return authUrl.toString();
  }

  /** 
   * PKCE AUTH FLOW
  getRedirectToSpotifyAuthorize() {
      // Generate a randome string for the code verifier
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

    const code_verifier = randomString;

    // Generate the code challenge
    const encoder = new TextEncoder();
    const data = encoder.encode(code_verifier);
    const hashed = window.crypto.subtle.digest('SHA-256', data);

    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    localStorage.setItem('code_verifier', code_verifier);

      // Construct the authorization URL
    const authUrl = new URL(authorizationEndpoint)
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params);
    return authUrl.toString();
  },
  

  async getAccessToken(code) {
    // Get the code verifier from local storage
    const code_verifier = localStorage.getItem('code_verifier');

    // Construct the request body
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: code_verifier,
      })
    };

    // Make the request
    const response = await fetch(tokenEndpoint, payload);

    try {
      if (response.ok){
          // If the request is successful, store the tokens in local storage and return the access token
          const { access_token, refresh_token, expires_in } = await response.json();
          localStorage.setItem('access_token', access_token, { expires: expires_in / 3600 / 24 });
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('expires', new Date().getTime() + expires_in * 1000);
          return access_token;
      } else{
          throw new Error(`Request error: ${response.status}`);
      }
    } catch (error) {
      console.log(error)
    }
  },

  async refreshToken() {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: currentToken.refresh_token
      }),
    });

    return await response.json();
  }
  */
}
