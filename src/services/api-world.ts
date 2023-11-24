import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper.ts";

export default {
    getSectors: async (cancelToken: CancelToken) => {
        try {
            const res = await axiosInstance.get("api/sector", {cancelToken: cancelToken});
            return res.data;
        } catch (error) {
            return handleError(error);
        }
    },
    getAdria: async (cancelToken: CancelToken) => {
        try {
            const res = await axiosInstance.get("api/adria", {cancelToken: cancelToken});
            return res.data;
        } catch (error) {
            return handleError(error);
        }
    },
};
