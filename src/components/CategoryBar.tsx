import {TCategory} from "./common/category";
import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import catApi from "../services/api-catergory";



export default function CategoryBar() {

    const [categories, setCategories] = useState<TCategory[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

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
        {isLoading ? (
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
                    <button>{c.name}</button>
                </li>
            ))}
        </ul>
    ) : (
        <p>No categories found!</p>
    )
}