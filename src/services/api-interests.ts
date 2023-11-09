import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper.ts";

export default {
    getInterests: (cancelToken: CancelToken) => {
        return axiosInstance.get("api/category", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
