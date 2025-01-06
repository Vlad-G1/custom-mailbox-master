import getMessagesCount from "./helpers/getMessagesCount.js";

const emptyMessage = document.querySelector('.js-letter-content-empty'),
    openedMessage = document.querySelector('.js-opened-message-content');

function deleteMessage() {
    const deleteMessageFunc = async (messageId) => {
        try {
            const response = await fetch('http://localhost:3001/gmailApiRequest/deleteMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({deleteMessageId: messageId}),
            });

            const data = await response.json();
            if (response.ok) {
                getMessagesCount();
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    document.querySelectorAll('.js-delete-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const messageId = button.getAttribute('data-message-id');
            deleteMessageFunc(messageId);
            const messageBlock = document.querySelector(`.js-incoming-letters-list [data-message-id="${messageId}"]`);
            if (messageBlock) {
                messageBlock.remove();
                emptyMessage.classList.remove('disable');
                openedMessage.classList.add('disable');
            }
        });
    });
}

export default deleteMessage;