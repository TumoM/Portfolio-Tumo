

exports.withAuth = (req, res, next) => {
    console.log("Checking Auth with Middleware");
    next()
}