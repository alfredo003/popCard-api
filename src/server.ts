import express from "express";
import { router } from "./routes";


const PORT = 3000;
const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
