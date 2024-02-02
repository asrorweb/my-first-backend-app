import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).json({ error: "Avtorizatsiya xatosi" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err)
            return res
                .status(403)
                .json({ error: "Tokenni tasdiqlashda xatolik" });

        req.user = user;
        next();
    });
}

export default authenticateToken;
