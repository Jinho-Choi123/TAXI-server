const express = require('express');
const router = express.Router();

const createGroupMiddleware = require('../middlewares/group/createGroup');
const deleteGroupMiddleware = require('../middlewares/group/deleteGroup');
const joinGroupMiddleware = require('../middlewares/group/joinGroup');
const searchGroupMiddleware = require('../middlewares/group/searchGroup');
const myPageMiddleware = require('../middlewares/group/myPage');

router.post('/create', createGroupMiddleware);
router.post('/delete', deleteGroupMiddleware);
router.post('/search', searchGroupMiddleware);
router.post('/join', joinGroupMiddleware);
router.post('/mypage', myPageMiddleware);

module.exports = router;