import {TEvent} from "./common/events";

type TEventBlockProps = {
    event: TEvent;
}

export default function EventBlock(prop: TEventBlockProps) {
    const imgByCat = prop.event.category.categoryId;

    return <div className="event" id={prop.event.id.toString()}>
                <h2>{prop.event.name}</h2>
                <ul>
                    <li>Organised by: {prop.event.organiser.firstName} {prop.event.organiser.lastName}</li>
                    <li>Located in sector: {prop.event.sector}</li>
                    <li>Spots left: {prop.event.amountOfPeople}</li>
                    <li>{prop.event.description}</li>
                    <li><img src={`../../src/assets/img/${imgByCat}.jpg`} alt={imgByCat.toString()}/></li>
                </ul>
            </div>;
}