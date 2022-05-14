let getHomePage = (req, res) => {
    return res.send("Hello World from controller")
}

module.exports = {
    getHomePage: getHomePage,
}