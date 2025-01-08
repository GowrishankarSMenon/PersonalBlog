const express = require('express');
const router = express.Router();

let blogs = [];

// Get all blogs
router.get('/', (req, res) => {
    res.json(blogs);
});

// Get a single blog by id
router.get('/:id', (req, res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).send('The blog with the given ID was not found.');
    res.json(blog);
});

// Create a new blog
router.post('/',(req, res) => {
    const newBlog = {id: Date.now().toString(), ...req.body};
    blogs.push(newBlog);
    res.status(201).json(newBlog);
});

// Update a blog
router.put('/:id', (req, res)=>{
    const index = blogs.findIndex(b => b.id === parseInt(req.params.id));
    if (index !== -1){
        blogs[index] = {...blogs[index], ...req.body};
        res.json(blogs[index]);
    }else res.status(404).send('The blog with the given ID was not found.');
});

// Delete a blog
router.delete('/id:', (req, res)=>{
    blogs = blogs.filter(b => b.id !== parseInt(req.params.id));
    req.status(204).send();
});

module.exports = router;