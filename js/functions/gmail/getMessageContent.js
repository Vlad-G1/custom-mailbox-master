import createMessageBody from "./helpers/createMessageBody.js";

const emptyCover = document.querySelector('.js-letter-content-empty'),
    messageBlock = document.querySelector('.js-opened-message-content'),
    deleteButton = document.querySelector('.js-delete-button'),
    openedMessageBlock = document.querySelector('.opened-message');

function getMessageContent() {
    const messages = document.querySelectorAll('.js-letter-item');
    messages.forEach(item => {
        item.addEventListener('click', async () => {
            const activeTab = document.querySelector('.js-tab.active')
            if (activeTab) {
                if (!emptyCover.classList.contains('disable')) {
                    emptyCover.classList.add('disable');
                    messageBlock.classList.remove('disable');
                    if (activeTab.classList.contains('js-tab-incoming')) {
                        deleteButton.classList.remove('disable');
                    } else {
                        deleteButton.classList.add('disable');
                    }
                }
            }
            const messageId = item.getAttribute('data-message-id');
            deleteButton.setAttribute("data-message-id", messageId);
            try {
                const response = await fetch('http://localhost:3001/gmailApiRequest/openMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({messageId: messageId})
                });
                if (response.ok) {
                    const data = await response.json();
                    openedMessageBlock.innerHTML = createMessageBody(data, messageId);
                } else {
                    console.error('Failed to open message!');
                }
            } catch (error) {
                console.error(error);
            }
        });
    });
}

export default getMessageContent;