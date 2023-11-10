import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper.ts";

export default {
    getSectors: (cancelToken: CancelToken) => {
        return axiosInstance.get("sector", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
