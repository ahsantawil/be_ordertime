var express = require('express');
var router = express.Router();
const { viewUsers, viewAdd, actionAdd, actionDelete, viewEdit, actionEdit } = require('./controller');

router.get('/', viewUsers );
router.get('/add', viewAdd);
router.post('/add', actionAdd);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
