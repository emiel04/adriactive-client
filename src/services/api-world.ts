import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper.ts";

export default {
    getSectors: (cancelToken: CancelToken) => {
        return axiosInstance.get("api/sector", {cancelToken: cancelToken}).then(res => {
            return res.data
        }).catch(error => handleError(error));
    },
    getAdria: async (cancelToken: CancelToken) => {
        try {
            return (await axiosInstance.get("api/adria", {cancelToken: cancelToken})).data;
        } catch (e) {
            handleError(e);
        }
    },
};
