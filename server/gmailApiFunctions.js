const express = require('express');
const { google } = require('googleapis');
const credentials = require('../credentials/credentials.json');
const token = require('../credentials/token.json');
const cors = require('cors');;
const createEmail = require('../js/functions/gmail/helpers/createEmail.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const authorize = async () => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    oAuth2Client.setCredentials(token);
    return oAuth2Client;
};

let gmail; // Глобальная переменная для хранения объекта gmail

const authorizeAndCreateGmail = async () => {
    const auth = await authorize();
    gmail = google.gmail({ version: 'v1', auth });
};

const listEmails = async () => {
    try {
        await authorizeAndCreateGmail();

        const response = await gmail.users.messages.list({
            userId: 'me',
            q: 'in:inbox',
        });

        const messages = response.data.messages;
        const detailedMessages = await Promise.all(messages.map(async (message) => {
            const detailedMessage = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
                format: "metadata"
            });
            return detailedMessage.data;
        }));

        return detailedMessages;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return [];
    }
};

app.post('/gmailApiRequest/markAsRead', async (req, res) => {
    const { messageId } = req.body;

    try {
        if (!gmail) {
            await authorizeAndCreateGmail();
        }

        const response = await gmail.users.messages.modify({
            userId: 'me',
            id: messageId,
            requestBody: {
                removeLabelIds: ['UNREAD']
            }
        });

        console.log('Message marked as read:', response.data);
        res.status(200).json({ message: 'Message marked as read successfully' });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ error: 'Failed to mark message as read' });
    }
});

app.get('/gmailApiRequest/getIncomingMessages', async (req, res) => {
    const messages = await listEmails();
    res.json(messages);
});

const listSentEmails = async () => {
    try {
        await authorizeAndCreateGmail();

        const response = await gmail.users.messages.list({
            userId: 'me',
            q: 'in:sent', // Фильтр для получения только отправленных сообщений
        });

        const messages = response.data.messages;
        const detailedMessages = await Promise.all(messages.map(async (message) => {
            const detailedMessage = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
            });
            return detailedMessage.data;
        }));

        return detailedMessages;
    } catch (error) {
        console.error('Error fetching sent emails:', error.response ? error.response.data : error.message);
        return [];
    }
};

app.get('/gmailApiRequest/getSentMessages', async (req, res) => {
    const sentMessages = await listSentEmails();
    res.json(sentMessages);
});

app.post('/gmailApiRequest/openMessage', async (req, res) => {
    const { messageId } = req.body;

    try {
        if (!gmail) {
            await authorizeAndCreateGmail();
        }

        const response = await gmail.users.messages.get({
            userId: 'me',
            id: messageId
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch message' });
    }
});

const sendMessage = async (req, res) => {
    const { recipientContent, subjectContent, messageContent } = req.body;

    try {
        if (!gmail) {
            await authorizeAndCreateGmail();
        }

        const email = createEmail(recipientContent, subjectContent, messageContent);

        const base64EncodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: base64EncodedEmail
            }
        });

        console.log('Email sent:', response.data);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

app.post('/gmailApiRequest/sendMessage', async (req, res) => {
    await sendMessage(req, res);
});

app.post('/gmailApiRequest/deleteMessage', async (req, res) => {
    const { deleteMessageId } = req.body;

    try {
        if (!gmail) {
            await authorizeAndCreateGmail();
        }

        const response = await gmail.users.messages.trash({
            userId: 'me',
            id: deleteMessageId
        });

        console.log('Message deleted:', response.data);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

const getTotalMessagesCount = async () => {
    try {
        await authorizeAndCreateGmail();

        const response = await gmail.users.messages.list({
            userId: 'me',
            q: 'in:inbox',
        });

        const totalMessagesCount = response.data.resultSizeEstimate;
        return totalMessagesCount;
    } catch (error) {
        console.error('Error fetching total messages count:', error);
        return 0;
    }
};

// Функция для получения количества непрочитанных сообщений
const getUnreadMessagesCount = async () => {
    try {
        await authorizeAndCreateGmail();

        const response = await gmail.users.messages.list({
            userId: 'me',
            q: 'in:inbox is:unread',
        });

        const unreadMessagesCount = response.data.resultSizeEstimate;
        return unreadMessagesCount;
    } catch (error) {
        console.error('Error fetching unread messages count:', error);
        return 0;
    }
};

app.get('/gmailApiRequest/getMessageCounts', async (req, res) => {
    try {
        const totalMessagesCount = await getTotalMessagesCount();
        const unreadMessagesCount = await getUnreadMessagesCount();

        res.json({ totalMessagesCount, unreadMessagesCount });
    } catch (error) {
        console.error('Error fetching message counts:', error);
        res.status(500).json({ error: 'Failed to fetch message counts' });
    }
});

app.listen(port, () => {console.log(`Server is running on http://localhost:${port}`)});