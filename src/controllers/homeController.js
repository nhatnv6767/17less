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
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send("Post crud from server")
}

let displayGetCRUD = async (req, res) => {
    return res.send('Display get CRUD from controller')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
}