import jwt from "jsonwebtoken";
import User from "../models/User.js";

const validateJWT = (req , res , next) =>{

    const authorizationHeader = req.get("authorization");

    if (!authorizationHeader) {
        res.status(401).send("Authorization header was not provided");
        return;
    }

    const token = authorizationHeader.split(" ")[1];
    if(!token){
        res.status(401).send("Bearer token not found");
        return;
    }

    jwt.verify(token , "supersecretkey123" , async (err , payload )=>{
        if(err){
            res.status(403).send("Invalid token");
        }
        if(!payload){
            res.status(403).send("Invalid token payload")
            return;
        }

        //fetch user from db based on the payload
        const user = await User.findById(payload.id);
        if (!user) {
        return res.status(403).send("User not found");
        }

        req.user = user ;
        next();
    })
}
export default validateJWT