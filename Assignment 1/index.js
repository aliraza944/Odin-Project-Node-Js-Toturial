const http = require("http");
const path = require("path");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "Pages", "index.html"), (err, content) => {
      if (err) throw err;
      else res.end(content);
    });
  } else if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "Pages", "about.html"), (err, content) => {
      if (err) throw err;
      else res.end(content);
    });
  } else if (req.url === "/contact") {
    fs.readFile(
      path.join(__dirname, "Pages", "contact-me.html"),
      (err, content) => {
        if (err) throw err;
        else res.end(content);
      }
    );
  } //end for contact
  else
    fs.readFile(path.join(__dirname, "Pages", "404.html"), (err, content) => {
      if (err) throw err;
      else res.end(content);
    });
}); //end create server
server.listen(8000);
