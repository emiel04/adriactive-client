import {TCategory} from "./category.tsx";
import {TUser} from "./user.tsx";
import {TCoordinate, TSector} from "./TWorldSector.tsx";

export type TEvent = {
    id: number;
    name: string;
    eventType: string;
    category: TCategory;
    organiser: TUser;
    amountOfPeople: number;
    startDateTime: number;
    sector: TSector;
    description: string;
    location: TCoordinate | null;
}

export type EventData = {
    name: string;
    description: string;
    amountOfPeople: number;
    categoryId: number;
    sectorId: number;
    startDateTime: number;
    hours: number;
};