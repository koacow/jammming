import Cookies from 'js-cookie';

const clientId = '43dfecb8d8204e079d7400ef09f3ed41'; // your clientId
const redirectUrl = 'http://localhost:3000/login';        // your redirect URL - must be localhost URL and/or HTTPS
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

export const currentToken = {
    get access_token() { return Cookies.get('access_token') },
    // get refresh_token() { return localStorage.getItem('refresh_token') },
    // get expires_in() { return localStorage.getItem('refresh_in') },
    // get expires() { return localStorage.getItem('expires') },
}

export function getRedirectToSpotifyAuthorize() {
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

  Cookies.set('code_verifier', code_verifier);

    // Construct the authorization URL
  const authUrl = new URL(authorizationEndpoint)
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  return authUrl.toString();
}

export async function getAccessToken(code) {
  // Get the code verifier from cookie
  const code_verifier = Cookies.get('code_verifier');

  // Construct request body
  const params = new URLSearchParams()
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUrl);
  params.append('code_verifier', code_verifier);

  // Make the request
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  try {
    if (response.ok){
        // If the request is successful, store the tokens in cookies and return the access token
        const { access_token, refresh_token, expires_in } = await response.json();
        Cookies.set('access_token', access_token, { expires: expires_in / 3600 / 24 });
        Cookies.set('refresh_token', refresh_token);
        Cookies.set('expires', new Date().getTime() + expires_in * 1000);
        return access_token;
    } else{
        throw new Error(`Request error: ${response.status}`);
    }
  } catch (error) {
    console.log(error)
  }
}

export async function refreshToken() {
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