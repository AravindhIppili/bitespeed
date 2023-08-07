import express from "express";
import bodyParser from "body-parser";
import identifyRouter from "./routes/identity";
import morgan from "morgan";
import dotenv from "dotenv";

//Basic app setup with morgan, parser for json data type
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
dotenv.config();
console.log(process.env.DB_HOST, "cjsu");

app.use(identifyRouter);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
