import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper";

export default {
    getEvents: (cancelToken: CancelToken) => {
        return axiosInstance.get("event", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
