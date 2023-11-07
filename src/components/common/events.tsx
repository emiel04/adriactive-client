import {TUser} from "./user.tsx";
/*import {TCategory} from "./category.tsx";
import {TLocation} from "./location.tsx";*/

export type TEvent ={
    id: number;
    title: string;
    //eventType: string;
    category: string;
    organiser: string;
    attendees: TUser[];
    location: string;
}