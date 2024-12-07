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
const update = async(i, newData) => {
    const findIdByIndex = await Notes.find().skip(i).limit(1).select('_id')
    const id = findIdByIndex[0]._id
    return Notes.updateOne(
        {_id: id},
        { $set: {data: newData}}
    )
}


// remove data 
const remove = async (i) => {
    const findIdByIndex = await Notes.find().skip(i-1).limit(1).select('_id');
    const id = findIdByIndex[0]._id
    return Notes.deleteOne({
        _id : id
    })


}
module.exports = {Notes, read, add, remove, update, checked}