module.exports = {
    url: [process.env.DB_CONNECT_CLUSTER_TOKYO_DEV, process.env.DB_NAME_DEV, '?retryWrites=true&w=majority'].join('')
};