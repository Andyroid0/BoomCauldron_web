import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    User ,
    
} from "firebase/auth";


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export var authState: boolean;
var user: User;

export const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then( userCredential => {
      // SIGNED IN
      user = userCredential.user;

    })
    .catch( error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });    
};

export const signIn = (email : string, password: string) => {

    signInWithEmailAndPassword( auth, email, password )
    .then( userCredential => {
      if ( userCredential.user.emailVerified ) {
        // SIGNED IN
        user = userCredential.user;
      }
    })
    .catch( error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const getUser = () : User => {
    return user;  
};

export const authChange = () => {
    onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          authState = true;
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
          authState = false;
        }
      });    
}