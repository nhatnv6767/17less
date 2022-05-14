import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    let hashPasswordFromBcrypt = await hashUserPassword(data.password)
    console.log("Hash password", hashPasswordFromBcrypt);
}

let hashUserPassword = (password) => {
    // dùng promise để luôn luôn trả ra kết quả, tránh việc xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }

    })
}

module.exports = {
    createNewUser: createNewUser,
}