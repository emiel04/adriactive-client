//import {TUser} from "./user.tsx";
import {TCategory} from "./category.tsx";
import {TOrganiser} from "./organiser.tsx";

export type TEvent ={
    id: number;
    title: string;
    eventType: string;
    category: TCategory;
    organiser: TOrganiser;
    //attendees: TUser[];
    sector: number;
}