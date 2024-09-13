const express = require("express");
const port = 8000;
const app = express();
app.use(express.json());
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const tokenSecret = "k";
const cors = require("cors");

app.use(cors());

app.get("/users", async (req, res) => {
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  res.send(result.users);
});

app.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;

  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  if (!username || !password) {
    res.status(400).send({ msg: "Add user detail" });
    return;
  }
  const user = result.users.find((el) => el.username === username);

  if (user) {
    res.status(404);
    res.send("username is not available");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  result.users.push({
    username,
    password: hashedPassword,
  });

  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
  res.send("succesfully created account");
});

app.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const findThisUsername = result.users.find((el) => el.username === username);

  if (!findThisUsername) {
    res.status(400).send(`Cannnot find this username = ${username}`);
    return;
  }
  const isMatch = bcrypt.compareSync(password, findThisUsername.password);

  if (!isMatch) {
    res.status(200).send("username or password is not match");
    return;
  }

  const token = jwt.sign({ username }, tokenSecret);
  res.send({ message: "Successfully logged in", username, token: `${token}` });
});

app.post("/refresh", async (req, res) => {
  const { token } = req.body;
  console.log(token);

  const decryptedToken = jwt.verify(token, tokenSecret);

  res.status(200).send(decryptedToken);
});

app.listen(port, () => {
  console.log(`running on ${port} `);
});
