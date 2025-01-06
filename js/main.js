import authValidation from "./functions/authValidation.js";
import preloader from "./functions/preloader.js";
import writeLetter from "./functions/writeLetter.js";
import getMessagesList from "./functions/gmail/getMessagesList.js";
import sendMessage from "./functions/gmail/sendMessage.js";
import switchTabs from "./functions/switchTabs.js";
import getMessagesCount from "./functions/gmail/helpers/getMessagesCount.js";
import logout from "./functions/logout.js";
import search from "./functions/search.js";

document.addEventListener("DOMContentLoaded", function () {
    authValidation();
    preloader();
    getMessagesList();
    getMessagesCount();
    writeLetter();
    sendMessage();
    switchTabs();
    logout();
    search();
});