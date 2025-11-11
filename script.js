const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync("../suppliers_2025-11-11.json", "utf8")
);

data.forEach((obj) => delete obj["SI No"]);

fs.writeFileSync("../suppliers_2025-11-11.json", JSON.stringify(data, null, 2));
