import config from "./config.json";

const api = `${config.host ? config.host + '/' : ''}${config.year ? config.year + '/' : ''}${config.group ? config.group + '/' : ''}`;

export default api;