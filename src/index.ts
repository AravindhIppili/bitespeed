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

app.get("/", (req, res) => {
    return res.send("Health test!!!");
});
app.use(identifyRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
