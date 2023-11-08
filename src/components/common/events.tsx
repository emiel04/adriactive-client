import {TCategory} from "./category.tsx";
import {TOrganiser} from "./organiser.tsx";

export type TEvent ={
    id: number;
    name: string;
    eventType: string;
    category: TCategory;
    organiser: TOrganiser;
    amountOfPeople: number;
    sector: number;
    description: string;
}