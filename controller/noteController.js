const { ObjectId } = require('mongodb');
const NoteModel = require('../models/noteModel');



//SHOW ALL NOTES

const  showNoteList = async (req, res)=>{

    const notes = await NoteModel.find();
    res.render('notes/index', {notes: notes})
}

const showSingleNote = async (req, res)=>{
    let note  = await NoteModel.findById(req.params.id);
    if(!note)
        res.status(404).send('Note not found');
    res.render('notes/view', {note: note});
}


//CREATE NOTE
const createNote = async (req, res) => {
  
    let note = new NoteModel();
  note.title = req.body.title;
  note.body = req.body.body;
  note.isCompleted = false;
  try{
  await note.save();
  res.redirect("/notes");
  }
  catch(e){
      let msg = e.message.replaceAll('Path', '');
      res.send(msg)
  }
};


// EDIT
const  editNote = async (req, res) =>{

    let note  = await NoteModel.findById(req.params.id);
    
    note.title = req.body.title;
    note.body = req.body.body;
    note.isCompleted = false;

    await note.save();

    res.redirect(`/notes/${note._id}`);
}


const  showEditPage = async (req, res) =>{

    let note  = await NoteModel.findById(req.params.id);
    if(!note)
        res.status(404).send('Note not found');
    
    res.render('notes/edit', {note: note});
};


// DELETE Note
const  deleteNote = async (req, res) =>{
    console.log('hello');
    let note  = await NoteModel.findById(req.params.id);
    console.log(note);
    await note.deleteOne({_id: new ObjectId(req.params.id)});
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