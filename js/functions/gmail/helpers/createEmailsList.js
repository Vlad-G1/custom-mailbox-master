import getInfo from "./getInfo.js";
import letterVisual from "./letterVisual.js";

function createEmailsList(data) {
    const emailsList = data.map(email => {

        return `<li class="letters-list__content-item js-letter-item ${letterVisual(email)}" data-message-id=${getInfo('id', email)}>
        <div class="letters-list__head">
            <p class="letters-list__head-name">${email.labelIds.includes('SENT') ? getInfo('to', email) : getInfo('name', email)}</p>
            <p class="letters-list__head-time">${getInfo('date', email)}</p>
        </div>
        <p class="letters-list__letter-title">${getInfo('title', email)}</p>
        <p class="letters-list__body">${getInfo('body', email)}</p>
    </li>`;
    }).join('');

    return emailsList;
}

export default createEmailsList;