import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }

            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist???
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in use, Plz try another email!',
                })
            }

            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            // modelName của model user.js
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve({
                errCode: 0,
                message: 'OK',
            })

        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    // dùng promise để luôn luôn trả ra kết quả, tránh việc xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            // tương tự return
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }

    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }

            await db.User.destroy({
                where: { id: userId },
            })
            resolve({
                errCode: 0,
                message: `The user is deleted successfully`
            })

        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                await db.User.save({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                })

                resolve({
                    errCode: 0,
                    message: 'Update the user succeed!'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}


/**
 * 
 * check ở trên rồi nhưng vẫn phải check ở dưới, check 2 lần
 * lý do là vì, trong thực tế, nhiều lúc trong lúc user đăng nhập
 * mà bản ghi đó bị xoá hay có vấn đề gì hoặc tài khoản bị khoá chẳng hạn
 * thì user phải bị 1 lần check như ở dưới để chắc chắn ko có lỗi đối với
 * user đó
 */