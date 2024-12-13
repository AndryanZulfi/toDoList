const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
require('./utils/database');
const notes = require('./model/note');
const { stringify } = require('querystring');

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Route untuk halaman utama
app.get('/', async (req, res) => {
    try {
        const listNotes = await notes.read();
        res.status(200).json({data: listNotes})
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

// Menambah data
app.post('/add', async (req, res) => {
    try {
        const newData = await notes.add(req.body.text);
        res.status(201).json({ data: newData });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// Update data
app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { text } = req.body;
        await notes.update(id, text);
        res.status(200).json({ id, text });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Cekliss
app.patch('/ceklis', async (req, res) => {
    try {
        const { id, condition } = req.body;
        await notes.checked(id, condition);
        res.status(200).json({ id, condition: !condition });
    } catch (e) {
        res.status(500).json({error: e.message });
    }
});

// Hapus data
app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await notes.remove(id);
        res.json({success: true})
    } catch (e) {
        res.status(500).json({success: false, error: e.message });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({error: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})
