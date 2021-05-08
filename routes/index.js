const express = require("express");
const router = express();
const contentRouter = require('./content.routes');

router.use('/content', contentRouter);
module.exports = router;