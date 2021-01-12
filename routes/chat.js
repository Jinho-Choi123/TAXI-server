const express = require('express');
const router = express.Router();
const loadChatMiddleware = require('../middlewares/chat/loadChat');

router.post('/load', loadChatMiddleware);

module.exports = router;