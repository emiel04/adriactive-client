import config from "./config.json";

const api = `${config.host ? config.host + '/' : ''}${config.year ? config.year + '/' : ''}${config.group ? config.group + '/' : ''}api/`;

export default api;