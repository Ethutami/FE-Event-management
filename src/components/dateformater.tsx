const formatDate = (
    dateString: string,
    includeWeekday: boolean = false,
    includeTime: boolean = false,
    onlyTime: boolean = false
) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    let formattedDate = ''

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    if (onlyTime) {
        formattedDate = ` | ${hours}:${minutes}`
    }

    if (includeWeekday) {
        options.weekday = 'long';
    }

    formattedDate = date.toLocaleDateString('id-ID', options);

    if (includeTime) {
        formattedDate += ` | ${hours}:${minutes}`;
    }

    return formattedDate;
};

export default formatDate


// day, ddmmmmyyyy
// ddmmmmyyyy | tt:mm
//day, ddmmmmyyyy | tt:mm