window.onload = () => {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCq9WifJ13qMLc78ZTEucuKLnfraIOOYzw",
    authDomain: "challaboratoria.firebaseapp.com",
    databaseURL: "https://challaboratoria.firebaseio.com",
    projectId: "challaboratoria",
    storageBucket: "challaboratoria.appspot.com",
    messagingSenderId: "44284247900"
  };

  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loggeadOut.style.display = 'none';
      loggeadIn.style.display = 'block';
      console.log('User -> ' + JSON.stringify(user));

    } else {
      loggeadOut.style.display = 'block';
      loggeadIn.style.display = 'none';
    }
  })
  firebase.database().ref('mensaje')
  .on('child_added', newMensaje => {
    mensajeContainer.innerHTML += `
    <p>Nombre: ${newMensaje.val().creatorName}</p>
    <p>${newMensaje.val().text}</p>`
  })
}

const register = () => {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('Usuario Registrado');
    })
    .catch(() => {
      console.log('Error de firebase =' + error.code);
      console.log('Error de firebase, mensaje =' + error.message);
    })
}

const login = () => {
  const emailValue = email.value;
  const passwordValue = password.value;

  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('Usuario con login exitoso');

    })
    .catch(() => {
      console.log('Error de firebase -> ' + error.code);
      console.log('Error de firebase, mensaje = ' + error.message);

    })
}

const logout = () => {
  firebase.auth().signOut()
  .then(() => {
    console.log('chao');
  })
  .catch();
}
const logginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  //provider.addScope(user_birthday)
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}
const sendMensage = () => {
  const currentUser = firebase.auth().currentUser;
  const mensajeText = mensajeArea.value;

  const newMensajeKey = firebase.database().ref().child('mensaje').push().key;

  firebase.database().ref(`mensaje/${newMensajeKey}`).set({
    creator : currentUser.uid,
    creatorName : currentUser.displayName,
    text : mensajeText,
  })
}

const btnSend = document.querySelector('#sendBtn');

const btnLogin = document.getElementById('btnloggin');
const btnRegister = document.getElementById('btnregister');
const btnLoggout = document.getElementById('btnloggout');
const btnFacebook = document.getElementById('loginFacebook');

btnSend.addEventListener('click',sendMensage)
btnFacebook.addEventListener('click',logginFacebook);
btnLogin.addEventListener('click', () => {
  login();
})
btnRegister.addEventListener('click', () => {
  register();
})
btnLoggout.addEventListener('click', () => {
  logout();
})