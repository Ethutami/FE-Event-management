import { IEvent } from "@/interfaces/events.interface";

export function checkEventStatus(startDate: string, endDate: string): string {
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

export const filterEventsByStatus = (events: IEvent[], status: string) => {
    return events.filter((event: IEvent) => {
        const start = new Date(event?.start_date);
        const end = new Date(event?.end_date);
        const now = new Date();
        switch (status) {
            case 'ongoing':
                return now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
            case 'upcoming':
                return now.getTime() < start.getTime();
            case 'expired':
                return end < now;
            default:
                return true;
        }
    });
};
