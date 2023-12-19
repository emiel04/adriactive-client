// import {useLocation} from "react-router";
import "../../assets/css/404.css"

export default function NotFound() {
    // const loc = useLocation();
    // return <>
    //     <p>404 Not found</p>
    //     {/*<p>{loc.pathname}</p>*/}
    //     {/*<p>{JSON.stringify(loc)}</p>*/}
    // </>
    return <div className="notfound">
        <h1>Page not found!</h1>
        <p>(╯°□°）╯︵ ┻━┻</p>
        <a href="#">Go to home</a>
    </div>
}