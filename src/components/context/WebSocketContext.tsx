import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import EventBus from "@vertx/eventbus-bridge-client.js";
import URI from "../../api";

export const WebSocketContext = createContext<any>({ eb: null });
const CHNL_TO_CLIENTS_BROADCAST = "events.to.users";

export type TWebSocketContext ={
    eb: any;
    addListener: (listener: (error: Error, message: any) => void) => void;
    removeListener: (listener: (error: Error, message: any) => void) => void;
}

export function WebSocketProvider({ children } : PropsWithChildren) {
    const [eb, setEb] = useState<any | null>(null);
    const [listeners, setListeners] = useState<((error: Error, message: any) => void)[]>([]);

    useEffect(() => {
        const eventBus = new EventBus(URI + "/events");

        eventBus.onopen = () => {
            console.log("Opening");
            eventBus.registerHandler(CHNL_TO_CLIENTS_BROADCAST, onBroadcast);
        };

        setEb(eventBus);

        return () => {
            eventBus.close();
        };
    }, [listeners]);
    const onBroadcast = (error: Error, message: any) => {
        if (!listeners) {
            console.error("No broadcast listeners defined");
        } else {
            listeners.forEach((l) => {
                l(error, message);
            });
        }
    };

    const addListener = (listener: (error: Error, message: any) => void) => {
        setListeners((prevListeners) => [...prevListeners, listener]);
    };
    const removeListener = (listener: (error: Error, message: any) => void) => {
        setListeners((prevListeners) => prevListeners.filter((l) => l !== listener));
    };

    return (
        <WebSocketContext.Provider value={{eb, addListener, removeListener}}>
            {children}
        </WebSocketContext.Provider>
    );
}

export const useWebSocket = () : TWebSocketContext => {
    const context: TWebSocketContext = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
