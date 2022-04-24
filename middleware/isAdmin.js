const checkIsAdminLogged = (req, res, next) => {
    const user = req.user;
    if (!user){
      //check if the token was generated
      res.status(403).json({msg: "Usted tiene que estar logeado"});
    } 
    if (user.roleId !== 1 ) return res.status(403).json({ msg: 'Solo el administrador puede tener acceso' });
    
    next();
}

module.exports = checkIsAdminLogged;

