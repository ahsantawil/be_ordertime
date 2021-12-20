var express = require('express');
var router = express.Router();
const { viewRegion, viewAdd, actionAdd, viewEdit, actionEdit, actionDelete } = require('./controller');

router.get('/', viewRegion);
router.get('/add', viewAdd);
router.post('/add', actionAdd);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
