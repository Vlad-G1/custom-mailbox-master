function checkAuthCookie() {
    return document.cookie.includes('userAuthenticated=true');
}

export default checkAuthCookie;