import express, { Request, Response } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
import router from "./routes/routes";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

app.get("/api/v1", (req: Request, res: Response) => {
    res.send({ msg: "healthy server" });
});

app.use("/api/v1/generate-itenary", router)
app.use("/api/v1/get-flights", router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
