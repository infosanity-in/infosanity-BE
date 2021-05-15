const express = require("express");
const router = express();
const contentRouter = require('./content.routes');
const userRouter = require('./user.routes');

router.use('/api/content', contentRouter);
router.use('/api/user', userRouter);

module.exports = router;
