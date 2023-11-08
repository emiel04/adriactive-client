import {TCategory} from "./common/category";
import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import catApi from "../services/api-catergory";
import {filterEvents} from "./pages/HomePage.tsx";

export default function CategoryBar() {

    const [categories, setCategories] = useState<TCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const catReq: CancelTokenSource = axios.CancelToken.source();
        catApi.getCategories(catReq.token).then(data => {
            setCategories(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });

        return () => {
            catReq.cancel();
        }
    }, [])

    return <header>
        {loading ? (
            <p>Loading...</p>
        ) : (
            renderCategorybar(categories)
        )}
    </header>
}

function renderCategorybar(categories: TCategory[]) {
    return categories && categories.length > 0 ? (
        <ul>
            {categories.map((c) => (
                <li key={c.name}>
                    <button className="capitalize" onClick={() => filterEvents(c.name)}>{c.name}</button>
                </li>
            ))}
        </ul>
    ) : (
        <p>No categories found!</p>
    );
}