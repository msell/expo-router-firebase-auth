import { ExpoConfig } from '@expo/config';

interface MyExpoConfig extends ExpoConfig {
  extra: {
    firebaseApiKey: string;
    firebaseAppId: string;
    firebaseProjectId: string;
    firebaseMessagingSenderId: string;
    firebaseStorageBucket: string;
    firebaseAuthDomain: string;
  };
}

const config: MyExpoConfig = {
    name: "firebase-auth-example",
    slug: "firebase-auth-example",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY as string,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID as string,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      firebaseAppId: process.env.FIREBASE_APP_ID as string
    },
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true
    }

};

module.exports = config;