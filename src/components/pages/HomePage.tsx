import {useState} from "react";

function CategoryBar() {

    const [categories, setCategories] = useState(["Sports", "Music"]);

    return <header>
        <ul>
            {categories.map(c => <li><button>{c}</button></li>)}
        </ul>
    </header>;
}

export default function HomePage() {
    return <>
        <CategoryBar></CategoryBar>
    </>;
}