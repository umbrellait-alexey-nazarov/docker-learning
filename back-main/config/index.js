class Config {
    port = process.env.HTTP_PORT || 8080;
    production = process.env.NODE_ENV === 'production';
    dbUri =  process.env.DB_URI || 'mongodb://127.0.0.1:27017/app';
    secondBackUrl = process.env.SECOND_BACK_URL || 'http://localhost:8081';
}

export default new Config();