import axios from 'axios';
import moment from "moment";

export const publishMessage = newMessage => {
    return axios
        .post('http://localhost:3000/messages/publish', {
            message: newMessage.message,
        }, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
        .then(res => {
            console.log(res.data)
        })
}

export const getMessages = userId => {
    return axios
        .get('http://localhost:3000/messages/' + userId, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
}

export const updateMessageApi = updateMessage => {
    return axios
        .put('http://localhost:3000/messages/' + updateMessage.messageId, {
            message: updateMessage.message
        }, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
        .then(res => {
            console.log(res.data)
        })
}

export const deleteMessage = messageId => {
    return axios
        .delete('http://localhost:3000/messages/' + messageId, {
            headers: {
                Authorization: localStorage.usertoken
            }
        })
        .then(res => {
            console.log('Message deleted!');
        })
        .catch(err => {
            console.log(err)
        })
}

export const getHashTags = (inputText) => {
    const mystring = inputText.message;
    console.log(inputText.message);
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(mystring))) {
        matches.push(match[1]);
    }

    return matches;
}

export const wrapHashtags = (inputText) => {
    var repl = inputText.replace(/#(\w+)/g, '<a href="/search/$1">#$1</a>');
    return repl;
}

export const displayDate = (createdDate) => {
    let a = moment(new Date()); //now
    let b = moment(createdDate);

    if (a.diff(b, "weeks") > 0) {
        return a.diff(b, "weeks") + " weeks ago";
    } else if (a.diff(b, "days") > 0) {
        return a.diff(b, "days") + " days ago";
    } else if (a.diff(b, "hours") > 0) {
        return a.diff(b, "hours") + " hours ago";
    } else {
        return a.diff(b, "minutes") + " minutes ago";
    }
}