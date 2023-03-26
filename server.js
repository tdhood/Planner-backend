
const app = require("../backend/nodeSetup/app");

app.listen(4000, function () {
  console.log("Started http://localhost:4000/");
  console.log("Bullet journal running.")
});

module.exports = app; 