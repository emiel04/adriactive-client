import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper.ts";

export default {
    getSectors: (cancelToken: CancelToken) => {
        return axiosInstance.get("api/sector", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
