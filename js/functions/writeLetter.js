const body = document.body,
    button = document.querySelector('.js-write-letter'),
    writeModal = document.querySelector('.js-write-modal'),
    closeButton = document.querySelector('.js-close');


function writeLetter() {
    button.addEventListener('click', ()=> {
        if (!writeModal.classList.contains('active')) {
            writeModal.classList.add('active')
            lockScroll();
        }
    })

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && writeModal.classList.contains('active')) {
            writeModal.classList.remove('active')
            unlockScroll();
        }
    });

    closeButton.addEventListener('click', ()=> {
        if (writeModal.classList.contains('active')) {
            writeModal.classList.remove('active')
            unlockScroll();
        }
    })

    writeModal.addEventListener('click', (event) => {
        if (event.target === writeModal) {
            writeModal.classList.remove('active')
        }
    });
}

function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.paddingRight = `${scrollbarWidth}px`;
    body.classList.add('no-scroll');
}

function unlockScroll() {
    body.style.paddingRight = '';
    body.classList.remove('no-scroll');
}

export default writeLetter;