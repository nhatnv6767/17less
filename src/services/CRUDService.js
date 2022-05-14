let createNewUser = (data) => {
    console.log("Data from service", data);
}

let hashUserPassword = (password) => {
    // dùng promise để luôn luôn trả ra kết quả, tránh việc xử lý bất đồng bộ
    return new Promise((resolve, reject) => {
        
    })
}

module.exports = {
    createNewUser: createNewUser,
}