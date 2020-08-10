if(!process.env.DB_NAME) {
    console.error('DB_NAME error');
    process.exit(1);
}
console.log("Environment: ", process.env.NODE_ENV, " DB: ", process.env.DB_NAME);
module.exports = {
    url: [process.env.DB_CONNECT_CLUSTER_TOKYO_DEV, process.env.DB_NAME, '?retryWrites=true&w=majority'].join('')
};