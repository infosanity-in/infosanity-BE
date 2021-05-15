const express = require("express");
const router = express();
const contentRouter = require('./content.routes');

router.use('/api/content', contentRouter);
module.exports = router;