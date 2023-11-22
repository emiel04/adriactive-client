import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper.ts";

export default {
    getInterests: (cancelToken: CancelToken) => {
        return axiosInstance.get("category", {cancelToken: cancelToken}).then(res => {
            console.log(res)
            return res.data;
        }).catch(handleError);
    },
    addInterests: (data: any, cancelToken: CancelToken) => {
        return axiosInstance.post("user/interests", data,{cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
