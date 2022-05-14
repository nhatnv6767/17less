import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    console.log("Data from service", data);
}

let hashUserPassword = (password) => {
    // dùng promise để luôn luôn trả ra kết quả, tránh việc xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync("B4c0/\/", salt);
        } catch (e) {
            reject(e);
        }

    })
}

module.exports = {
    createNewUser: createNewUser,
}