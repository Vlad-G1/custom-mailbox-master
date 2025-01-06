import checkAuthCookie from "./gmail/helpers/checkAuthCookie.js";

const preloaderBlock = document.querySelector('.preloader'),
    authBlock = document.querySelector('.auth');

function preloader() {
    if (!checkAuthCookie()) {
        setTimeout(() => {
            authBlock.classList.remove('disable')
        }, 2700)
        setTimeout(() => {
            preloaderBlock.classList.add('disable')
        }, 4000)
    } else {
        setTimeout(() => {
            preloaderBlock.classList.add('disable')
        }, 4000)
    }
}

export default preloader;