import checkAuthCookie from "./gmail/helpers/checkAuthCookie.js";

const authBlock = document.querySelector('.auth'),
    loginInput = document.querySelector('#auth-email'),
    passwordInput = document.querySelector('#auth-password'),
    button = document.querySelector('.js-auth-button'),
    errorText = document.querySelector('.js-error-text');

function authValidation() {
    checkAuthCookie() ? authBlock.classList.add('disable') : '';

    button.addEventListener('click', () => {
        if (loginInput.value !== 'boyko.course.work@gmail.com' || passwordInput.value !== 'gbpltwrkfccyfzhf,jnf2024') {
            loginInput.classList.add('error');
            passwordInput.classList.add('error');
            errorText.classList.add('active');
        } else {
            if (loginInput.classList.contains('error') || passwordInput.classList.contains('error')) {
                loginInput.classList.remove('error');
                passwordInput.classList.remove('error');
            }
            if (!errorText.classList.contains('active')) {
                errorText.classList.add('active');
            }
            errorText.innerHTML = 'Вход...';
            errorText.classList.add('successful');
            setAuthCookie();
            setTimeout(()=>{
                authBlock.classList.add('disable')
            }, 2000)
        }
    })
}

function setAuthCookie() {
    document.cookie = 'userAuthenticated=true';
}

export default authValidation;