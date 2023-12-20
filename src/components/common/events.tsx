import {TCategory} from "./category.tsx";
import {TUser} from "./user.tsx";
import {TSector} from "./TWorldSector.tsx";

export type TEvent = {
    id: number;
    name: string;
    eventType: string;
    category: TCategory;
    organiser: TUser;
    amountOfPeople: number;
    sector: TSector;
    description: string;
}