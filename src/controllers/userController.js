let handleLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // check email exist 
    // compare password
    // return userInfor
    // access_token:JWT <json web token>
    return res.status(200).json({
        message: 'hello world',
        yourEmail: email,

    })
}

module.exports = {
    handleLogin: handleLogin,
}