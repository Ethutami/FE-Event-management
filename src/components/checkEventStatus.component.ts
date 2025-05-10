function checkEventStatus(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now.getTime() < start.getTime()) {
        return "Up Coming";
    } else if (now.getTime() >= start.getTime() && now.getTime() <= end.getTime()) {
        return "On Going";
    } else {
        return "Expired";
    }
}

export default checkEventStatus
