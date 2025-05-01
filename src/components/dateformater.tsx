const formatDate = (
    dateString: string,
    includeWeekday: boolean = false, // minggu, 20 april 2025
    includeTime: boolean = false, // 20 april 2025 | 12:00
    onlyTime: boolean = false // 12:00
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
        return formattedDate = `${hours}:${minutes}`
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