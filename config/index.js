class Config {
    port = process.HTTP_PORT || 8080;
    production = process.NODE_ENV === 'production';
    dbUri = '';
}

export default new Config();