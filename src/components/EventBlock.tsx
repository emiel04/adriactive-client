import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TEvent} from "./common/events";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import getSectorName from "../helpers/sectorhelper.ts";


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
        <div onClick={() => navigate(`/app/events/view/${prop.event.id}`)} className="event" key={prop.event.id.toString()}>
            <img src={imgSrc} alt={`Category: ${prop.event.name}`}/>
            <p>{prop.event.name}</p>
            <ul>
                {!prop.simple &&
                  <li><PersonIcon/>{prop.event.organiser.firstName} {prop.event.organiser.lastName}</li>
                }
                <li><LocationOnIcon/> {getSectorName(prop.event.sector.id)}</li>
                {!prop.simple &&
                  <li><CheckCircleIcon/>{4} spots of {prop.event.amountOfPeople} left</li>
                }
            </ul>
        </div>
    );
}