const loginRegister = () => {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('Usuario Registrado');
      
    })
    .catch(() => {
      console.log('Error de firebase =' +error.code);
      console.log('Error de firebase, mensaje' + error.message);
      
      
    })
}

const btnLogin = document.getElementById('btnloggin');
btnLogin.addEventListener('click', () => {
  loginRegister();
})