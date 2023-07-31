const isLoggedIn = (req , res, next) => {
    // console.log(req)
    let userCookie = req.header('cookie')
    if(!userCookie) {
        res.redirect('/login')
    } else {
        next();   
    }
}

const checkAuth = (req, res , next) =>{
    let userCookie = req.header('cookie')
    if(userCookie) {
        res.redirect('/login')
    } else {
        next();   
    }
}

module.exports = {
    isLoggedIn,
    checkAuth
}