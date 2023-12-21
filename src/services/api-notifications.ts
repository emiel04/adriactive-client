import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper";

export default {
    getNotifications: (cancelToken: CancelToken) => {
        return axiosInstance.get("api/notifications", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
