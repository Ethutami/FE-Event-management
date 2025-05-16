type DateFormatOptions = {
    includeWeekday: boolean;
    includeTime: boolean;
    onlyTime: boolean;
    dateFormat: boolean;
};

function createDateFormatter(dateString: string) {
    const options: DateFormatOptions = {
        includeWeekday: false, //sunday, 20 april 2025
        includeTime: false,
        onlyTime: false,
        dateFormat: false, //MM/DD/YYYY
    };

    function dateFormat() {
        options.dateFormat = true
        return builder
    }

    function includeWeekday() {
        options.includeWeekday = true;
        return builder;
    }

    function includeTime() {
        options.includeTime = true;
        return builder;
    }

    function onlyTime() {
        options.onlyTime = true;
        return builder;
    }

    function build(): string {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        let formattedDate = '';

        const formatOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        if (options.onlyTime) {
            return `${hours}:${minutes}`;
        }

        if (options.includeWeekday) {
            formatOptions.weekday = 'long';
        }

        if (options.dateFormat) {
            return dateString ? new Date(dateString).toLocaleDateString('sv-SE') : '';
        }

        formattedDate = date.toLocaleDateString('id-ID', formatOptions);

        if (options.includeTime) {
            formattedDate += ` | ${hours}:${minutes}`;
        }

        return formattedDate;
    }

    const builder = {
        includeWeekday,
        includeTime,
        onlyTime,
        dateFormat,
        build,
    };

    return builder;
}

export default createDateFormatter