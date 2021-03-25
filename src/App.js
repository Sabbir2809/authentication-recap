import './App.css';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var user = result.user;
        setUser(user);
        console.log(user);

      }).catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var user = result.user;
        setUser(user);
        console.log("FB user", user);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var user = result.user;
        setUser(user);
        console.log("Github",user);
        
      }).catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using Google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign in using GitHub</button>
      <h3>User Name: {user.displayName}</h3>
      <p>User Image URL: {user.photoURL}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
