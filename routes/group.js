const express = require('express');
const router = express.Router();

const createGroupMiddleware = require('../middlewares/group/createGroup');
const deleteGroupMiddleware = require('../middlewares/group/deleteGroup');

router.post('/create', createGroupMiddleware);
router.post('/delete', deleteGroupMiddleware);

module.exports = router;