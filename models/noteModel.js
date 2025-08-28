const { Schema, default: mongoose } = require("mongoose");


const noteSchema = new Schema(
    {
        title : {type: String, required: true},
        body: {
            type: String,
            required :[true, "Please note details"],
            minLength: 20
        },
        isCompleted: Boolean,
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
    }
)

const NoteModel = mongoose.model('Note', noteSchema);
module.exports = NoteModel;