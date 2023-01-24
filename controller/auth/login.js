module.exports=async (req, res, next) => {
    return res.status(200).json({
        message: 'Login successful',
        token: res.token,
        user: req.user,

    });
}