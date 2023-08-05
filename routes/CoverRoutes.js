const express = require("express");
const { getAssignmentCover } = require("../controller/coversController");

const router = express.Router();

router.route('/assignment')
    .post(getAssignmentCover)

module.exports = router;