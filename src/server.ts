import express from "express";
import { authRouter } from "./routes/auth.routes"; 

const PORT = 3000;
const app = express();
app.use(express.json());

app.use("/", authRouter);
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
