class Config {
    port = process.env.HTTP_PORT || 8080;
    production = process.env.NODE_ENV === 'production';
    dbUri =  process.env.DB_URI || 'mongodb://127.0.0.1:27017/app';
}

export default new Config();