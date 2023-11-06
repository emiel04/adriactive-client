import axios, {CancelToken} from "axios";
import URI from "../api";

const handleError = (error: Error) => {
    if (axios.isCancel(error)) {
        return null;
    }
    console.error(error);
    throw error;
};


export default {
    getCategories: (cancelToken: CancelToken) => {
        console.log(URI);
        return axios.get(URI + "category", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
