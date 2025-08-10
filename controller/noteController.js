const {connect, getDb} = require('../data/dbConnection');
const { ObjectId } = require('mongodb');



//SHOW ALL NOTES

const  showNoteList = async (req, res)=>{

    let collection = getDb().collection('notes');
    const notes = await collection.find().toArray();
    res.render('notes/index', {notes: notes})
}

const showSingleNote = async (req, res)=>{
    let collection = getDb().collection('notes');
    let note  = await collection.findOne({"_id": ObjectId.createFromHexString(req.params.id)});

    if(!note)
        res.status(404).send('Note not found');
    res.render('notes/view', {note: note});
}


//CREATE NOTE
const createNote = async (req, res) => {
  let note = {};
  note.title = req.body.title;
  note.body = req.body.body;
  note.isCompleted = false;

  let collection = getDb().collection("notes");

  await collection.insertOne(note);
  res.redirect("/notes");
};


// EDIT
const  editNote = async (req, res) =>{
    const collection = getDb().collection('notes');
    var note = await collection.findOne({"_id": new ObjectId(req.params.id)});
    note.title = req.body.title? req.body.title: note.title;
    note.body = req.body.body? req.body.body: note.body;
    note.isCompleted = req.body.isCompleted? req.body.isCompleted : note.isCompleted;
    collection.replaceOne({_id: note._id}, note);
    res.redirect(`/notes/${note._id}`);
}


const  showEditPage = async (req, res) =>{
    
    const collection = getDb().collection('notes');
    var note = await collection.findOne({"_id": new ObjectId(req.params.id)});

    res.render('notes/edit', {note: note});
};


// DELETE Note
const  deleteNote = async (req, res) =>{
    const collection = getDb().collection('notes');
    var noteToDelete = await collection.findOne({"_id": new ObjectId(req.params.id)});
    const deletedNote = await collection.deleteOne(noteToDelete);
    res.redirect('/notes');
}



module.exports = {
    showNoteList,
    showSingleNote,
    createNote,
    editNote,
    showEditPage,
    deleteNote
}