const express = require('express');
const router = express.Router();
const client = require('../db');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM blogs');
        res.json(result.rows);  // Return the rows of the blogs
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
});

// Get a single blog by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM blogs WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog' });
    }
});

// Create a new blog
router.post('/', async (req, res) => {
    const { title, content, date, readTime } = req.body;
    
    // Basic validation
    if (!title || !content || !date || !readTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await client.query(
            'INSERT INTO blogs (title, content, date, read_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, date, readTime]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add blog' });
    }
});

// Update a blog
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, date, readTime } = req.body;

    try {
        const result = await client.query(
            'UPDATE blogs SET title = $1, content = $2, date = $3, read_time = $4 WHERE id = $5 RETURNING *',
            [title, content, date, readTime, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog' });
    }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await client.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

module.exports = router;
