import auth from "@react-native-firebase/auth";
import { storage } from "../store/mmkv";


export const signUp = async (email, password) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
};

export const signIn = async (email, password) => {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User logged in!');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        console.log('The email address does not exist');
      }
      console.error(error);
    });
};

export const signOut = async () => {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

export const getToken = async () =>
{
  auth().currentUser.getIdToken(true)
      .then((idToken)=>{
        storage.set("FirebaseJWT",idToken);
  });
}

export const getUser = async () =>
{
  const user = await auth().currentUser;
  return {
    uid:user.uid,
    email:user.email ? user.email:''
  };
}
