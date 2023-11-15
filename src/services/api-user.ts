import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper.ts";

export default {
    getUser: (cancelToken: CancelToken) => {
        return axiosInstance.get("user", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    getUserInterests: (cancelToken: CancelToken) => {
        return axiosInstance.get("user/interests", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    updateUserInterests: (cancelToken: CancelToken) => {
        return axiosInstance.post("user", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    }
};
