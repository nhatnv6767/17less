import db from '../models/index'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exists
                // compare password
                resolve()
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist. Try again!`
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}