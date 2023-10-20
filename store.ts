import { Store, registerInDevtools } from "pullstate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  sendEmailVerification as baseSendEmailVerification,
  onIdTokenChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";

type AuthStoreState = {
  isLoggedIn: boolean;
  initialized: boolean;
  user: User | null;
  emailVerified: boolean;
}
export const AuthStore = new Store<AuthStoreState>({
  isLoggedIn: false,
  initialized: false,
  user: null,
  emailVerified: false,
});

// const unsub = onAuthStateChanged(auth, (user) => {
//   console.log("onAuthStateChange", user);
//   AuthStore.update((store) => {
//     store.user = user;
//     store.isLoggedIn = user ? true : false;
//     store.initialized = true;
//     store.emailVerified = user ? user.emailVerified : false;
//   });
// });

onIdTokenChanged(auth, (user) => {
  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = user ? true : false;
    store.initialized = true;
    store.emailVerified = user ? user.emailVerified : false;
  })
});

export const sendEmailVerification = () => {
  if(!auth.currentUser) return;
  return baseSendEmailVerification(auth.currentUser);
}
export const appSignIn = async (email: string, password: string) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    AuthStore.update((store) => {
      store.user = resp.user;
      store.isLoggedIn = resp.user ? true : false;
    });
    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

export const appSignOut = async () => {
  try {
    await signOut(auth);
    AuthStore.update((store) => {
      store.user = null;
      store.isLoggedIn = false;
    });
    return { user: null };
  } catch (e) {
    return { error: e };
  }
};

export const appSignUp = async (email: string, password: string, displayName: string = '') => {
  try {
    // this will trigger onAuthStateChange to update the store..
    const resp = await createUserWithEmailAndPassword(auth, email, password);

    // add the displayName
    await updateProfile(resp.user, { displayName });

    AuthStore.update((store) => {
      store.user = auth.currentUser;
      store.isLoggedIn = true;
    });

    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

registerInDevtools({ AuthStore });