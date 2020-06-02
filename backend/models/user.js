const query = require('./db')

const getUser = async (id) => {
    if (validId(id)) {
        return query(`
            select * from users
            where id = ?`,
            [id])
    }
}

const validId = async (id) => {
    ids = await query(`select id from users`)
    for (const i of ids) {
        if (id == i.id) return true
        return false
    }
}

const createUser =  async (email, username, password, name, surname) => {
    return query(`
        insert into users (email, name, role, surname, username, password)
        values (?, ?, ?, ?, ?, ?)`,
        [email, name, "normal", surname, username, password]
    )
}

const deleteUser = async (id) => {
    return query(`
        delete from users
        where id = ?`,
        [id]
    )
}

const updateUser = async (object) => {
    if (validId(object.id)) {
        if(object["name"]) {
            await update(object.id, "name",object.name)
        }
        if(object["surname"]) {
            //await update(object.id, "surname",object.surname)
        }
        if(object["username"]) {
            await update(object.id, "username",object.name)
        }
        if(object["email"]) {
            await update(object.id, "email",object.name)
        }
        if(object["password"]) {
            await update(object.id, "password",object.name)
        }
    }
}

const update = async (id, column_name, update) => {
    console.log(id, typeof id);
    console.log(column_name, typeof column_name);
    console.log(update, typeof update);
    return query(`
        update users
        set ? = ?
        where id = ?`,
        [column_name, update, id]
    )
}

module.exports = {
    createUser,
    deleteUser,
    getUser,
    updateUser
}
