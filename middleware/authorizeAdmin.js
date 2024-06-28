const authorizeAdmin = (role) => {
    return (request, response, next) => {
      if (request.user && request.user.role === "admin") {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden: Access denied' });
      }
    };
  };

  module.exports=authorizeAdmin
  