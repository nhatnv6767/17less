import db from '../models/index'
let getHomePage = async (req, res) => {
    try {
        let data = await db.user.findAll();
        // vì đã cấu hình đường dẫn trong file viewEngine.js nên sẽ tự động tìm 
        return res.render('homepage.ejs')
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    getHomePage: getHomePage,
}