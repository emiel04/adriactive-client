import {useLocation} from "react-router";

export default function NotFound() {
    const loc = useLocation();
    return <>
        <p>404 Not found</p>
        <p>{loc.pathname}</p>
        <p>{JSON.stringify(loc)}</p>
    </>
}