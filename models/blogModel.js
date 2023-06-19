const mongosse = require("moongosse");

const blogSchema = mongosse.Schema({
    title: {
        type: String,
        required: [true, "Blog must have a title"],
    },

    body: {
        type: String,
        required: [true, "Blog must have a body"],
    },
}); 

module.exports = mongosse.model("Blog", blogSchema);