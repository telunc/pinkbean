import moment from 'moment';

export default (message) => {
    message.channel.send(`Next Kritias Invasion\n${invasion()}`);
};

function invasion() {
    let now = new Date();
    let periods = [8, 10, 12, 14, 16, 18, 20, 22];
    periods = periods.map((period) => moment({ hour: period }));
    let next = periods[0];
    
    periods.forEach((period, index) => {
        if (period < now) {
            if (index === periods.length - 1) {
                next = periods[0].add(1, 'day');
            } else {
                next = periods[index + 1];
            }
        }
    });

    let d = (next - now) / 1000;
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours ') : '';
    let mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes ') : '';
    let sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

    return hDisplay + mDisplay + sDisplay;
}