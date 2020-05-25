module.exports = {
    mongodb_URI: {
        URI: 'mongodb+srv://djcurso:<Password>@cluster0-eg5tm.mongodb.net/test?retryWrites=true&w=majority'
    },
    app_config: {
        host: 'http://localhost',
        port: process.env.port || 4000 
    }
}
