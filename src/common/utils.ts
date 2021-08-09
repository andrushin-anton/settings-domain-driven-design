export class Utilities {
    public static addDays(days: number): number {
        const date = new Date();
        date.setDate(date.getDate() + days);
        // convert into timestamps with seconds
        return Math.floor(date.getTime() / 1000);
    }

    public static addMinutes(minutes: number): number {
        const date = new Date();
        const minutesInMilliseconds = minutes * 60000;
        date.setTime(date.getTime() + minutesInMilliseconds);
        // convert into timestamps with seconds
        return Math.floor(date.getTime() / 1000);
    }

    public static nowInSeconds(): number {
        return Math.floor(Date.now() / 1000);
    }

    public static nowInDatabaseFormat(): string {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}
