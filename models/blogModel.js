const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog must have a title"],
    },

    body: {
        type: String,
        required: [true, "Blog must have a body"],
    },

    date: {
        type: Date,
        required: [true, "Blog must have a body"],  
    },
}); 

module.exports = mongoose.model("Blog", blogSchema);