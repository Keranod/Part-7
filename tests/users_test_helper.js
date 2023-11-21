const User = require('../models/user')

const initialUsers = [
    {
        username: 'root',
        name: 'Superuser',
        password: 'kiloogorkow'
    },
    {
        username: 'notARoot',
        name: 'notASuperuser',
        password: 'miligramczekolady'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialUsers,
    usersInDb
}
