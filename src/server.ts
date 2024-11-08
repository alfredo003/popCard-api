import express,{Request,Response} from "express";

const PORT = 3000;
const app = express();

app.get("/", (req:Request, res:Response) => {
    //const test = req.params;
  return res.status(200).send();
});
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
