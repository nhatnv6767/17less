let getHomePage = (req, res) => {
    // vì đã cấu hình đường dẫn trong file viewEngine.js nên sẽ tự động tìm 
    return res.render('homepage.ejs')
}

module.exports = {
    getHomePage: getHomePage,
}