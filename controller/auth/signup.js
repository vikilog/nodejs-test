module.exports=async (req, res, next) => {
    return res.status(200).json({
        message: 'Signup successful',
        user: req.user,
    });
}