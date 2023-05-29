import express, { Application, Router, Request, Response } from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import { CorsConfig } from "./interfaces/cors.js";
import { defaultConfig } from "./controllers/config.js"
dotenv.config();
const app: Application = express();
const config: CorsConfig = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
const PORT = process.env.PORT || 3001;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(config));
app.use(
  csrf({
    cookie: {
      httpOnly: true,
      maxAge: 100, // 24hrs,
      sameSite: "strict",
    },
  })
);
app.use(defaultConfig);
app.get("/csrf", function (req: Request, res: Response) {
  let token: string = req.csrfToken();
  console.log(token);
  res.json(token);
  res.end();
});

app.listen(PORT, () => {
  console.log(`App is up and running at port ${PORT}`);
});
