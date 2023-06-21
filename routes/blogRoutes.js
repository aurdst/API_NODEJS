const Blog = require("../models/blogModel");

const router = {
    async handleRequest(req, res) {
        //The code block above checks the url and method properties of the request object. It then fetches all blogs from the database via the find method on the mongoose model (Blog).
        
        // GET: /api/blogs
        if (req.url === "/api/blogs" && req.method === "GET") {
            // get all blogs
            const blogs = await Blog.find();
            
            //set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            
            // send data
            res.end(JSON.stringify(blogs));
        }
        
        // GET: /api/blogs/:id
        // Here i use REGEX expression for check the format URL
        if (req.url.match(/\/api\/blogs\/([0-9]+)/) && req.method === "GET") {
            try {
                //extract id from url
                console.log(req.url);
                //here i use split for take only the id
                const id = req.url.split("/")[3];
                
                //get blog from DB
                const blog = await Blog.findById(id);
                
                if(blog) {
                    res.writeHead(200, { "Content-Type" : "application/json" });
                    res.end(JSON.stringify(blog));
                } else {
                    throw new Error("Blog does exist");
                }
            } catch (error) {
                res.writeHead(404, { "Content-Type": "application/json"});
                res.end(JSON.stringify({message: error}));
            }
        }
        
        // POST: /api/blogs/
        if (req.url === "/api/blogs" && req.method === "POST") {
            try {
                let body = "";
                
                //Listen for data event
                req.on("data", (chunk) => {
                    body += chunk.toString();
                });
                
                //l=Listen for end event
                req.on("end", async() => {
                    let blog = new Blog(JSON.parse(body));
                    
                    //Save to DB
                    await blog.save();
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(blog));
                });
            } catch (error) {
                console.log(error);
            }
        }
        
        // PUT: /api/blogs/:id
        if (req.url.match(/\/api\/blogs\/[0-9]\//) && req.method === "PUT") {
            try {
                //extract id from url
                const id = req.url.split("/")[3];
                let body = "";
                
                req.on("data", (chunk) => {
                    body += chunk.toString();
                })
                
                req.on("end", async() => {
                    // Find and update document
                    let updateBlog = Blog.findByIdAndUpdate(id, JSON.parse(body), {
                        new: true,
                    })
                });
                
                res.writeHead(200, {"Content-Type": "application/json" });
                res.end(JSON.stringify(updateBlog));
            } catch (error) {
                console.log(error);
            }
        }
        
        // DELETE : /api/blogs/:id
        if (req.url.match(/\/api\/blogs\/([0-9]+)/) && req.method === "DELETE") {
            try {
                const id = req.url.split("/")[3];
                
                //Delete blog from id
                await Blog.findByIdAndDelete(id);
                res.writeHead(200, {"Content-Type": "application/json" });
                res.end(JSON.stringify ({ message : "blog deleted successfully" }))
            } catch (error) {
                res.writeHead(404, {"Content-Type" : "application/json"}); 
                res.end(JSON.stringify({message: error}));
            }
    }},
};

module.exports = router;