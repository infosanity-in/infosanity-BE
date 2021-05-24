const express = require('express');
const router = express();
const contentRouter = require('./content.routes');
const tagRouter = require('./tags.routes');

router.use('/api/content', contentRouter);
router.use('/api/tags', tagRouter);
module.exports = router;
