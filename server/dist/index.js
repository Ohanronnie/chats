import express, { Router } from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
dotenv.config();
const app = express();
const config = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
const PORT = process.env.PORT || 3001;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(config));
app.use(csrf({
    cookie: {
        httpOnly: true,
        maxAge: 100,
        sameSite: "strict",
    },
}));
app.get("/", function (req, res) {
    let token = req.csrfToken();
    let token2 = req.csrfToken();
    res.json(token);
    console.log(token, token2);
    res.end();
});
function logMiddleware(req, res, next) {
    console.log("Request received:", req.url);
    next();
}
class UserController {
    @logMiddleware
    @Router.get("/users")
    getUsers(req, res) {
        // Logic to fetch users
        res.json({ message: "Getting users" });
    }
}
const userController = new UserController();
userController.getUsers();
app.listen(PORT, () => {
    console.log(`App is up and running at port ${PORT}`);
});
