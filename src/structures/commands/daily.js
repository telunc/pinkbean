export default (message) => {
    let midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);

    let d = (midnight.getTime() - new Date().getTime()) / 1000;
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours ') : '';
    let mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes ') : '';
    let sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

    message.channel.send('Daily Reset\n' + hDisplay + mDisplay + sDisplay);
};