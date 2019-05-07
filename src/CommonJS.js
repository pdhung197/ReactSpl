export function difffromtime(starttime, endtime) {
    var timediff = endtime.getTime() - starttime.getTime();
    var timediffsec = timediff / 1000;
    var timedifftext = '';

    var day = Math.floor(timediffsec / (60 * 60 * 24));
    if (day > 0) return day + ' days ago';
    timediffsec -= day * 60 * 60 * 24;

    var hour = Math.floor(timediffsec / (60 * 60));
    if (hour > 0) timedifftext += hour + ' hours ';
    timediffsec -= hour * 60 * 60;

    var minute = Math.floor(timediffsec / 60);
    if (minute > 0) timedifftext += minute + ' minutes ';

    timedifftext += 'ago';
    return timedifftext;
}

