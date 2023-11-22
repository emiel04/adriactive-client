import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper";

export default {
    getEvents: (cancelToken: CancelToken) => {
        return axiosInstance.get("api/event", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    getEventFromId: (eventId: any, cancelToken: CancelToken) => {
        return axiosInstance.get(`event/${eventId}`, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    createEvent: (data: any, cancelToken: CancelToken) => {
        return axiosInstance.post("event", data,{cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    editEvent: (data: any, cancelToken: CancelToken) => {
        return axiosInstance.put("event", data,{cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
};
