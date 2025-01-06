import getInfo from "./getInfo.js";

function createMessageBody(data) {
    return `<div class="opened-message__head">
                <div class="opened-message__head-user">
                    <p class="opened-message__head-user-name">${getInfo('name', data)} ${getInfo('name', data) === 'boyko.course.work@gmail.com' ? ' (Вы)' : ''}</p>
                    <p class="opened-message__head-user-title">${getInfo('title', data)}</p>
                    <p class="opened-message__head-user-recipient">Кому:
                        <span>${getInfo('recipient', data)}</span>
                    </p>
                </div>
                <p class="opened-message__head-date">${getInfo('date', data)}</p>
            </div>
            <div class="opened-message__content">
                <p>${getInfo('body', data)}</p>
            </div>`
}

export default createMessageBody;