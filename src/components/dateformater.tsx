const formatDate = (
    dateString: string,
    includeWeekday: boolean = false,
    includeTime: boolean = false
) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    if (includeWeekday) {
        options.weekday = 'long';
    }

    let formattedDate = date.toLocaleDateString('id-ID', options);

    if (includeTime) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        formattedDate += ` | ${hours}:${minutes}`;
    }

    return formattedDate;
};

export default formatDate


// day, ddmmmmyyyy
// ddmmmmyyyy | tt:mm
//day, ddmmmmyyyy | tt:mm