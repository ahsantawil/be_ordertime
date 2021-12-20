var express = require('express');
var router = express.Router();
const { viewProvince, viewAdd, actionAdd, viewEdit, actionEdit, actionDelete } = require('./controller');

router.get('/', viewProvince);
router.get('/add', viewAdd);
router.post('/add', actionAdd);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
