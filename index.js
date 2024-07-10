import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { setUpJoke: "Waiting for data...", deliveryJoke: "Waiting for data..." });
  });

app.post("/get-joke", async (req, res) => {
    const searchId = req.body.id;
  try {
    const result = await axios.get(`https://v2.jokeapi.dev/joke/Any?contains=${searchId}`);
    res.render("index.ejs", {
      setUpJoke: result.data.setup || "",
      deliveryJoke: result.data.delivery || "No joke found",
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500).send("Error retrieving joke");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
