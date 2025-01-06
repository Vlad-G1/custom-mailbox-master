const logoutButton = document.querySelector('.js-logout'),
    authBlock = document.querySelector('.auth');

function logout() {
    logoutButton.addEventListener('click', () => {
        deleteAuthCookie();
        authBlock.classList.remove('disable');
    })
}

function deleteAuthCookie() {
    document.cookie = 'userAuthenticated=; Max-Age=-1;';
}

export default logout;