const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const Notes = new mongoose.model('note', {
    data : {
        type : String,
        require: true
    },
    isChecked: {
        type : Boolean,
        default: false
    }
})

const checked = async(id, value) =>{
    return await Notes.updateOne(
        {_id:  new ObjectId(id)},
        {isChecked: !value}
    )
}                                                              


// read data
const read = () => {
    return Notes.find()
}

// add data
const add = (data) =>{
    return new Notes({
        data
    }).save()
}

// update
const update = async(id, newData) => {
    return Notes.updateOne(
        {_id: new ObjectId(id)},
        { $set: {data: newData}}
    )
}


// remove data 
const remove = async (id) => {
    return Notes.deleteOne({
        _id : new ObjectId(id)
    })


}
module.exports = {Notes, read, add, remove, update, checked}