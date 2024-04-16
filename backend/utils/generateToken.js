import jwt from "jsonwebtoken";

const generateTokenAndSecretCookie = (userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds 
        httpOnly: true, // prevent xss attacks cross-site scripting attacks (to not accessable by a javascript)
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks 
        secure:process.env.NODE_ENV !== "development",
    })
}

export default generateTokenAndSecretCookie;