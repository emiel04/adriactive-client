import {CancelToken} from "axios";
import axiosInstance, {handleError} from "../helpers/axioshelper";

export default {
    getEvents: (cancelToken: CancelToken) => {
        return axiosInstance.get("api/event", {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    getEventFromId: (eventId: number, cancelToken: CancelToken) => {
        return axiosInstance.get(`api/event/${eventId}`, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    createEvent: (data: any, cancelToken: CancelToken) => {
        return axiosInstance.post("api/event", data, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    editEvent: (id: number, data: any, cancelToken: CancelToken) => {
        return axiosInstance.put(`api/event/${id}`, data, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    joinEvent: (id: number, cancelToken: CancelToken) => {
        return axiosInstance.post(`api/event/${id}/join`, {}, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    cancelEvent: (id: number, cancelToken: CancelToken) => {
        return axiosInstance.put(`api/event/${id}/cancel`, {}, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    leaveEvent: (id: number, cancelToken: CancelToken) => {
        return axiosInstance.post(`api/event/${id}/leave`, {}, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    },
    hasUserJoined: (id: number, cancelToken: CancelToken) => {
        return axiosInstance.get(`api/event/${id}/join`, {cancelToken: cancelToken}).then(res => {
            return res.data;
        }).catch(handleError);
    }
};
