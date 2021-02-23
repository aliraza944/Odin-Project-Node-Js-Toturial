const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");
const logger = require("./Middleware/Logger");
const app = express();

//init midileware
// app.use(logger);

//handlebars middleware

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//bodtParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route for handlebars page

app.get("/", (req, res) => {
  res.render("index", { title: "member app", members });
});

//set a static folder

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./Routes/Api/Members"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`the server is in port ${PORT}`);
});
