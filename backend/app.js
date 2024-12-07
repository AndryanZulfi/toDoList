const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const path = require('path');
require('./utils/database')
const notes = require('./model/note')
app.use(express.static('../frontend/public'))
app.set('views', path.join(__dirname, '../frontend/src/views'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', async(req,res)=>{
    try{
        const listNotes = await notes.read()
        res.render('index',{
                title: 'Home',
                listNotes: JSON.stringify(listNotes),
            })
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// menambah data
app.post('/add', async(req,res)=>{
    try{
        const newData = await notes.add(req.body.text)
        res.status(201).json({success: true, data: newData})
    }catch (e){
        res.status(500).json({error: e.message})
    }
})


// Update data
app.put('/update/:id', async(req, res) => {
    try{
        const id= parseInt(req.params.id)
        const {text} = req.body
        await notes.update(id, text)
        res.status(200).json({success: true, id, text})
    }catch(e){
        res.status(500).json({error: e.message})
    }
})

// cekliss

app.patch('/ceklis', async(req, res) => {
    try{
        const {id, condition} = req.body
        await notes.checked(id, condition)

        res.status(200).json({succes: true, id, condition: !condition})
    }catch(e){
        res.status(500).json({error: e.message})
    }
})




// hapus data
app.delete('/:index', async(req, res) => {
    try{
        const index = parseInt(req.params.index)
        await notes.remove(index);
        res.json({success: true})
    }catch (e){
        res.status(500).json({error: e.message})
    }
})

app.use('/', (req,res)=>{
    res.status(404).json({error: 'Not Found'})
})



app.listen(port, ()=>{
    console.log(`Server berjalan pada port ${port}`)
})