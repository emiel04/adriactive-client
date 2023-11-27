import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TEvent} from "./common/events";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';


type TEventBlockProps = {
    simple?: boolean
    event: TEvent;
    onClick: () => void;
};

export default function EventBlock(prop: TEventBlockProps) {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    useEffect(() => {
        import(`../assets/img/${prop.event.category.categoryId}.png`)
            .then((module) => {
                setImgSrc(module.default);
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });
    }, [prop.event.category.categoryId]);

    return (
        <div onClick={() => navigate(`/app/events/view/${prop.event.id}`)} className="event"
             key={prop.event.id.toString()}>
            <img src={imgSrc} alt={`Category: ${prop.event.name}`}/>
            <p>{prop.event.name}</p>
            <ul>
                {!prop.simple &&
                  <li><PersonIcon/>{prop.event.organiser.firstName} {prop.event.organiser.lastName}</li>
                }
                <li><LocationOnIcon/> {prop.event.sector}</li>
                {!prop.simple &&
                  <li><CheckCircleIcon/> {prop.event.amountOfPeople} - {4} spots left</li>
                }
                {!prop.simple &&
                  <li><DescriptionIcon/> {prop.event.description}</li>}
            </ul>
        </div>
    );
}