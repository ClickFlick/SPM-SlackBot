const express = require("express");
var bodyParser = require("body-parser");


const app = express();

// * Allow us to process POST requests since express doesn't support it out of the box
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/purchase')(app);
require('./routes/action')(app);

const PORT = 9999;
app.listen(PORT, () => {
  console.log(`Server is running for Purchase! on port ${PORT}`);
});
