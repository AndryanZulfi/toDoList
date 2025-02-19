<template>
<form id="todo-form" @submit.prevent="submitData">
        <input v-model="textNewNote" type="text" id="todo-input" placeholder="Add a new task..." required>
        <button type="submit" id="add-button">Add</button>
</form>
<ul id="todo-list">
        <li v-for="(list, i) in listNotes" :key="i" @click="isChecked(i)">
            <div class="content">
                <div 
                    class="ceklis"
                    :class="{checked: list.isChecked}"
                >
                <ion-icon 
                    name="checkmark" 
                    v-if="list.isChecked">
                </ion-icon>
            </div>
                <span 
                    class="text-note" 
                    :class="{decoration: list.isChecked}"
                    v-if="conditionUpdate[i] == false" >
                    {{list.data}}
                </span>
                <form  
                    class="form-update" 
                    id="update-form" 
                    @submit.prevent="updateItem(i, newText)"
                    v-if="conditionUpdate[i]"
                >
                <input 
                    type="text"
                    :ref="'inputUpdate-' + i" 
                    class="update-input" 
                    id="update-input" 
                    name="text" 
                    :placeholder="list.data" 
                    :key="i"
                    autofocus
                    v-model="newText"
                    @click.stop=""
                    >
            </form>
             </div>
            <span class="span-btn">
                <div class="btn-event" v-if="conditionUpdate[i] == false">
                    <ion-icon name="albums" class="update-btn" @click.stop="showUpdate(i)"></ion-icon>
                    <ion-icon name="trash" class="delete-btn" @click.stop="deleteItem(i)"></ion-icon>
                </div>
                <div class="btn-confirm-update" v-if="conditionUpdate[i]">
                    <ion-icon name="checkmark" class="checkmark-confirm" @click.stop="updateItem(i, newText)"></ion-icon>
                    <ion-icon name="close" class="cancel-update" @click.stop="showUpdate(i)"></ion-icon>
                </div>
            </span>
        </li>
    </ul>
</template>

<script>
const API_URL = import.meta.env.API_URL;
import 'ionicons/dist/ionicons/ionicons.esm.js';
import axios from 'axios'
    export default {
        data(){
            return {
                listNotes: [],
                conditionUpdate: [],
                textNewNote: '',
                newText: '',
            }
        },

        async mounted() {
            await this.fetchNotes()
        },
        methods: {
            async fetchNotes(){
                try{
                    const response = await axios.get(`${API_URL}`)
                    if(response.status == 200){
                        this.listNotes = response.data.data.reverse()
                        this.conditionUpdate = response.data.data.map(() => false)
                    }app
                }catch(e){
                    console.log(e)
                }
            },
            async submitData() {
                    try {
                        const response = await axios.post(`${API_URL}/add`, { text: this.textNewNote }, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (response.status == 201) {
                            this.listNotes.unshift(response.data.data)
                            this.conditionUpdate.unshift(false)
                            this.textNewNote = '';
                        } else {
                            console.error('Failed Add');
                        }
                    } catch (e) {
                        console.error(e);
                    }
                },
            async deleteItem(i){
                const id = this.listNotes[i]._id
                    try {
                        const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
                        console.log(response)
                        if (response.ok) {
                            this.listNotes.splice(i, 1);
                        } else {
                            console.error('Failed delete');
                        }
                    } catch (err) {
                        console.error(err);
                    }
            },
            async updateItem(index, newData) {
                    const id = this.listNotes[index]._id
                    try {
                        const response = await axios.put(`${API_URL}/update/${id}`, { text: this.newText }, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (response.status == 200) {
                            this.listNotes[index].data = response.data.text;
                            this.conditionUpdate[index] = !this.conditionUpdate[index];
                        } else {
                            console.log('Failed Update');
                        }
                    } catch (err) {
                        console.error(err);
                    }
                },
                showUpdate(i) {
                    this.conditionUpdate[i] = !this.conditionUpdate[i];
                    this.newText = '';
                    this.conditionUpdate.forEach((el, index, arr) => {
                        if (index !== i) {
                            arr[index] = false;
                        }
                    });
                    if (this.conditionUpdate[i]) {
                        this.$nextTick(() => {
                            const input = this.$refs['inputUpdate-' + i][0];
                            if (input) input.focus();
                        });
                    }
                },
                displayNoneUpdateForm(i) {
                    this.conditionUpdate[i] = false;
                },
                ceklis(id) {
                    this.conditionCeklis[id] = !this.conditionCeklis[id];
                },
                async isChecked(i) {
                    try {
                        const response = await axios.patch(`${API_URL}/ceklis`, { id: this.listNotes[i]._id, condition: this.listNotes[i].isChecked }, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (response.status == 200) {
                            this.listNotes[i].isChecked = response.data.condition;
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
        }
    }

</script>

