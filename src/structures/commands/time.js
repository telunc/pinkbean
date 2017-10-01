import moment from 'moment';

export default (message) => {
    message.channel.send(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
};