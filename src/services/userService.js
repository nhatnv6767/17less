import db from '../models/index'
import bcrypt from 'bcryptjs'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exists

                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                })
                // giải thích bên dưới
                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok'
                        // xoa password khi show API
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2,
                        userData.errMessage = `User's not found`
                }

            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist. Try again!`

            }
            resolve(userData);
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


/**
 * 
 * check ở trên rồi nhưng vẫn phải check ở dưới, check 2 lần
 * lý do là vì, trong thực tế, nhiều lúc trong lúc user đăng nhập
 * mà bản ghi đó bị xoá hay có vấn đề gì hoặc tài khoản bị khoá chẳng hạn
 * thì user phải bị 1 lần check như ở dưới để chắc chắn ko có lỗi đối với
 * user đó
 */