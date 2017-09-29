export default (message) => {
    let start = message.createdTimestamp;
    message.channel.send('Pink Bean responded').then((message) => {
        let diff = (message.createdTimestamp - start);
        message.edit(`Pink Bean responded in *${diff/1000} seconds*`);
    }).catch((error) => console.log(error));
};