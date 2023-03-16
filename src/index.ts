import express from "express";
import createImage from "./satori";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/:name", async (req, res) => {
  const { name } = req.params;

  // drop Content-Length as it should be automatically added by express
  res.writeHead(201, { "Content-Type": "image/png" });

  res.end(await createImage(name));
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
