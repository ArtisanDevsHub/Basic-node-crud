const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController');

router.get('/create', (req, res)=>{
    res.render('notes/create');
});

router.get('/:id', noteController.showSingleNote);

router.get('/', noteController.showNoteList);

router.post('/create', noteController.createNote);

router.get('/:id/edit', noteController.showEditPage);

router.post('/:id/delete', noteController.deleteNote);

router.post('/:id/edit', noteController.editNote);

module.exports = router;
