import express from "express";
import cors from "cors";
import rootRouter from './src/routes/index'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",rootRouter)

app.get("/",(req,res)=>{
  res.send("Hello from bun")
})

app.listen(3002,()=>{
  console.log("listening on 3002")
})