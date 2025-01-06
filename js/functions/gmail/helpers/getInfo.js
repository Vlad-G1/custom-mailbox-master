import getDate from "./getDate.js";
function getInfo(infoType, subject) {
    switch (infoType) {
        case 'id':
            return subject.id;
        case 'title':
            return subject.payload.headers.find(header => header.name === 'Subject').value;
        case 'to':
            return subject.payload.headers.find(header => header.name === 'To').value;
        case 'name':
            return subject.payload.headers.find(header => header.name === 'From').value.replace(/"/g, '').replace(/<[^>]*>/g, '');
        case 'recipient':
            return subject.payload.headers.find(header => header.name === 'Delivered-To' || header.name === 'To').value;
        case 'date':
            return getDate(subject.payload.headers.find(header => header.name === 'Date').value);
        case 'body':
            return subject.snippet;
        default:
            console.log('Unknown');
    }
}

export default getInfo;