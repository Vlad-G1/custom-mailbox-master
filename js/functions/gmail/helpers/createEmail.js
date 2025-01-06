function createEmail(recipientContent, subjectContent, messageContent) {
    function base64Encode(str) {
        return Buffer.from(str).toString('base64');
    }

    const encodedSubject = `=?utf-8?B?${base64Encode(subjectContent)}?=`;

    const emailLines = [
        `To: ${recipientContent}`,
        'Content-Type: text/plain; charset="UTF-8"',
        'MIME-Version: 1.0',
        `Subject: ${encodedSubject}`,
        '',
        `${messageContent}`
    ];

    return emailLines.join('\r\n');
}

module.exports = createEmail;