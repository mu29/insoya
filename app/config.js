import config from './config.json';

const env = process.env.NODE_ENV || 'development';

config[env].mode = env;
config[env].__MODE__ = env;
config[env].API_ENTRY = config[env].api_entry;

export default config[env];
export const __MODE__ = env;
export const API_ENTRY = config[env].api_entry;
