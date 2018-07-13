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
const btnLogin = document.getElementById('btnloggin');
const btnRegister = document.getElementById('btnregister');
const btnLoggout = document.getElementById('btnloggout');

btnLogin.addEventListener('click', () => {
  login();
})
btnRegister.addEventListener('click', () => {
  register();
})
btnLoggout.addEventListener('click', () => {
  logout();
})