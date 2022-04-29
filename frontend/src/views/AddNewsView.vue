<template>
    <div style="background-color: #DBF6E9 ; min-height: calc(100vh - 3.25rem);" class=" p-3">
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="field">
                    <label class="label is-size-4">NEWS TITLE <span style="color: red">*</span></label>
                    <input class="input" type="text" v-model="title" />
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS DESCRIPTION <span style="color: red">*</span></label>
                    <textarea class="textarea" rows="2" v-model="description"></textarea>
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS CATEGORY <span class="icon" @click="addCategory">
                            <i class="fas fa-plus"></i>
                        </span></label>
                    <div class="columns" v-for="item_c in inputs_CATEGORYS" :key="item_c.id">
                        <div class="column is-11">
                            <input class="input" type="text" v-model="item_c.category">
                        </div>
                        <div class="column">
                            <button @click="delCategory(item_c)" class="button has-background-danger" type="button">
                                <span class="icon">
                                    <i class="fas fa-2x fa-trash-alt" style="color: white;"></i>
                                </span></button>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS REFFERENCES <span @click="addReference" class="icon">
                            <i class="fas fa-plus"></i>
                        </span></label>
                    <div class="columns" v-for="item_r in inputs_REFERENCES" :key="item_r.id">
                        <div class="column is-11">
                            <input class="input" type="text" v-model="item_r.reference">
                        </div>
                        <div class="column">
                            <button @click="delReference(item_r)" class="button has-background-danger" type="button">
                                <span class="icon">
                                    <i class="fas fa-2x fa-trash-alt" style="color: white;"></i>
                                </span></button>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <div class="file is-large is-boxed mt-auto">
                        <label class="file-label" style="width: 100%;">
                            <input class="file-input" type="file" name="news" id="news" accept="image/png, image/jpeg" />
                            <span class="file-cta has-text-centered" style="height: 160px; justify-content: center">
                                <span class="file-icon m-0">
                                    <i class="fa fa-plus"></i>
                                </span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="mt-3 has-text-centered">
                    <button
                        class="button has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth"
                        style="background-color: #9DDFD3" type="button" @click="addnews">
                        Create News
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            title: "",
            description: "",
            inputs_CATEGORYS: [{ id: 1, category: '' }],
            inputs_REFERENCES: [{ id: 1, reference: '' }],
            idCounter_CATEGORY: 0,
            idCounter_REFERENCE: 0
        }
    },
    created() {
        this.idCounter_CATEGORY = this.inputs_CATEGORYS.length
        this.idCounter_REFERENCE = this.inputs_REFERENCES.length
    },
    methods: {
        addnews() {
            var formData = new FormData();
            var imagefile = document.querySelector('#news');
            formData.append("news", imagefile.files[0]);
            formData.append('new_title', this.title);
            formData.append('new_des', this.description);
            formData.append('new_cat', JSON.stringify(this.inputs_CATEGORYS));
            formData.append('new_ref', JSON.stringify(this.inputs_REFERENCES));
            axios.post(`http://localhost:5000/addnews`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    console.log(response.data.message)
                    this.$router.push(`/news`)
                })
                .catch((error) => {
                    alert(error.response.data.message)
                });
        },
        addCategory() {
            this.idCounter_CATEGORY += 1
            this.inputs_CATEGORYS.push({ id: this.idCounter_CATEGORY, category: '' })
            console.log(this.inputs_CATEGORYS)
            console.log(this.inputs_REFERENCES)
        },
        delCategory(item) {
            let index = this.inputs_CATEGORYS.findIndex((val) => val.id === item.id)
            this.inputs_CATEGORYS.splice(index, 1)
            console.log(this.inputs_CATEGORYS)
            console.log(this.inputs_REFERENCES)
        },
        addReference() {
            this.idCounter_REFERENCE += 1
            this.inputs_REFERENCES.push({ id: this.idCounter_REFERENCE, reference: '' })
            console.log(this.inputs_CATEGORYS)
            console.log(this.inputs_REFERENCES)
        },
        delReference(item) {
            let index = this.inputs_REFERENCES.findIndex((val) => val.id === item.id)
            this.inputs_REFERENCES.splice(index, 1)
            console.log(this.inputs_CATEGORYS)
            console.log(this.inputs_REFERENCES)
        }
    },
}
</script>