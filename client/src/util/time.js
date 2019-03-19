export const ms2str = function(ms) {
    if(!(ms = parseInt(ms))) return;
    let time = new Date(ms);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds;
};
