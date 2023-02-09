import auth from '@react-native-firebase/auth';

export const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(
      'jane.doe@example.com',
      'SuperSecretPassword!',
    )
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

export const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
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

export const signOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
