const express = require('express');
const router = express.Router();

import { 
    getAllUpdates,
    getStatusUpdate,
    createStatusUpdate,
    updateStatus, 
    deleteStatus 
} from "../controllers";

router.get('/', getAllUpdates);
router.post('/status_updates/:id', getStatusUpdate)
router.post('/status_updates', createStatusUpdate);
router.put('/update/:id', updateStatus);
router.delete('/update/:id', deleteStatus);
// TODO: use getstatusupdates tomorrow.
module.exports = router;