module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/user', require('./user.routes.js'))
    app.use('/products', require('./products.routes.js'))
    app.use('/auth', require('./auth.routes.js'))
    //app.use('/api', require('./api.routes.js'))
}