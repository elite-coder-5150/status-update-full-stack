const express = require('express');
const router = express.Router();

import { getAllUpdates } from "../controllers/status-update.controller";

router.get('/', getAllUpdates)
module.exports = router;