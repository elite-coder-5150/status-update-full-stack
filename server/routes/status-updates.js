const express = require('express');
const router = express.Router();

import { getAllUpdates } from "../controllers";

router.get('/', getAllUpdates);
router.put('/update', updateStatus);
module.exports = router;