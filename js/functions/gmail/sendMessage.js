function sendMessage() {
    const button = document.querySelector('.js-submit'),
        to = document.querySelector('.js-new-letter-recipient'),
        subject = document.querySelector('.js-new-letter-title'),
        message = document.querySelector('.js-new-letter-body'),
        preloader = document.querySelector('.js-sent-message-preloader'),
        writeModal = document.querySelector('.js-write-modal'),
        notification = document.querySelector('.js-notification'),
        errorBlock = document.querySelector('.js-write-error'),
        inputs = document.querySelectorAll('.js-write-input');

    button.addEventListener('click', async () => {
        const recipientContent = to.value;
        const subjectContent = subject.value;
        const messageContent = message.value;
        preloader.classList.remove('disable');

        const response = await fetch('http://localhost:3001/gmailApiRequest/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipientContent, subjectContent, messageContent }), // Передача созданного письма
        });

        if (response.ok) {
            writeModal.classList.remove('active');
            preloader.classList.add('disable');
            notification.classList.add('active');
            document.body.style.paddingRight = '';
            document.body.classList.remove('no-scroll');
            if (!errorBlock.classList.contains('disable')) {
                errorBlock.classList.add('disable');
            }
            setTimeout(()=> notification.classList.remove('active'), 3000);
            for (let input of inputs) {
                input.value = '';
            }
        } else {
            errorBlock.classList.remove('disable');
            preloader.classList.add('disable');
        }
    });
}

export default sendMessage;