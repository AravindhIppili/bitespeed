import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import sequelize from "./db/connect";
import identifyRouter from "./routes/identity";
import morgan from "morgan";
import Contact from "./models/contact";

//Basic app setup with morgan, parser for json data type
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    return res.send("Health test!!!");
});
app.use(identifyRouter);

const PORT = process.env.PORT || 3002;

(async () => {
    try {
        await sequelize.authenticate();
        await Contact.sync({ force: true });
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
            console.log(`MySql DB connected`);
        });
    } catch (error) {
        console.log("An error occurred while starting the server", error);
    }
})();
