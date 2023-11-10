import config from "./config.json";

const getApi = () => {
    if (process.env.NODE_ENV === 'development') {
        return `${config.host ? config.host + '/' : ''}`;
    } else {
        return `${config.host ? config.host + '/' : ''}${config.year ? config.year + '/' : ''}${config.group ? config.group + '/' : ''}`;;
    }
}

export const getBaseName = () => {
    // Check if the app is running locally or on the server
        return '/';
};


export default getApi();