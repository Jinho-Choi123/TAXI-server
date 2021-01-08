const express = require('express');
const router = express.Router();

const createGroupMiddleware = require('../middlewares/group/createGroup');

router.post('/create', createGroupMiddleware);

module.exports = router;