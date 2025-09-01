const { ObjectId } = require('mongodb');
const NoteModel = require('../models/noteModel');



//SHOW ALL NOTES

const  showNoteList = async (req, res)=>{

    let currentUser = req.session.user;
    if(!currentUser)
        res.redirect('/users/user-login');

    let username = currentUser.username;
    const notes = await NoteModel.find({userId: currentUser._id});

    res.render('notes/index', {notes: notes, user : currentUser})
}

const showSingleNote = async (req, res)=>{
    
    let currentUser = req.session.user;
    if(!currentUser)
        res.redirect('/users/user-login');

    let username = currentUser.username;
    
    let note  = await NoteModel.findById(req.params.id);
    if(!note)
        res.status(404).send('Note not found');
    res.render('notes/view', {note: note});
}


//CREATE NOTE
const createNote = async (req, res) => {
  
let currentUser = req.session.user;
if(!currentUser)
    res.redirect('/users/user-login');

  let note = new NoteModel();
  note.title = req.body.title;
  note.body = req.body.body;
  note.isCompleted = false;
  note.userId = currentUser._id
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