export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;

/// AWS
const apiId = 'pqvta0rish';
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`;

// export const authConfig = {
//   // TODO: Create an Auth0 application and copy values from it into this map
//   domain: 'dev-965zdczv.us.auth0.com', // Auth0 domain
//   clientId: 'JklQpk18eXMY19ALvODYdbhx3pQQUxon', // Auth0 client id
//   callbackUrl: 'http://localhost:3000/callback'
// };
