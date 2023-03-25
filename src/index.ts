import express from "express";
import ProfileCardHandler from "./handlers/ProfileCardHandler";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/user/:name", ProfileCardHandler);

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});

