module.exports.tgAuth = async (req, res) => {
    process.env.phone_code = req.query.code;
    console.log(process.env.phone_code);
    res.send("success")
};
