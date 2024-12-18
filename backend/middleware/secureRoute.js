import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "No user found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in secureRoute:", error);
        res.status(500).json({ message: "Internal server error" ,error});
    }
}

export default secureRoute;