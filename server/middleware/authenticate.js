var { Users } = require('./../models/Users')

//custom middleware
var authenticate = (request, response, next) => {
    let token = request.header('x-auth')
    Users.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        request.user = user
        request.token = token
        next()
    }).catch((err) => {
        response.status(401).send()
    })
}

module.exports = { authenticate }