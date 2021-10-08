import { DaysOfTheWeek } from './days-of-the-week.enum';

export interface BusinessHours {
    dayOfTheWeek: DaysOfTheWeek;
    openingTime: string;
    closingTime: string;
}
