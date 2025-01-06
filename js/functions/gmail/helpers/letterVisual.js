function letterVisual(data) {
    const isUnread = data.labelIds.includes('UNREAD');
    const isSent = data.labelIds.includes('SENT');

    let classToAdd = '';

    if (isUnread && !isSent) {
        classToAdd = 'unread';
    } else if (!isUnread && !isSent) {
        classToAdd = 'read';
    }

    return classToAdd;
}

export default letterVisual;