import db from '../models/index'
import CRUDService from '../services/CRUDService'
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // vì đã cấu hình đường dẫn trong file viewEngine.js nên sẽ tự động tìm 
        return res.render('homepage.ejs', {
            // truyền biến data ra view
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    return res.send("Post crud from server")
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}