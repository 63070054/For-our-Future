<template>
    <div style="background-color: #DBF6E9 ; min-height: calc(100vh - 3.25rem);" class=" p-3">
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="field">
                    <label class="label is-size-4">NEWS TITLE <span style="color: red">*</span></label>
                    <input class="input" type="text" v-model="newstitle" />
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS DESCRIPTION <span style="color: red">*</span></label>
                    <textarea class="textarea" rows="2" v-model="newsdes"></textarea>
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS CATEGORY <span class="icon" @click="addCategory">
                            <i class="fas fa-plus"></i>
                        </span></label>
                    <div class="columns" v-for="cate in inputs_CATEGORYS" :key="cate.id">
                        <div class="column is-11">
                            <input class="input" type="text" v-model="cate.category_name">
                        </div>
                        <div class="column">
                            <button @click="delCategory(cate)" class="button has-background-danger" type="button">
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
                    <div class="columns" v-for="ref in inputs_REFERENCES" :key="ref.id">
                        <div class="column is-11">
                            <input class="input" type="text" v-model="ref.ref_name">
                        </div>
                        <div class="column">
                            <button @click="delReference(ref)" class="button has-background-danger" type="button">
                                <span class="icon">
                                    <i class="fas fa-2x fa-trash-alt" style="color: white;"></i>
                                </span></button>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <div class="file is-large is-boxed mt-auto">
                        <label class="file-label" style="width: 100%;">
                            <input class="file-input" type="file" name="news" id="news"
                                accept="image/png, image/jpeg" />
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
                        style="background-color: #9DDFD3" type="button" @click="editnews">
                        Create News
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            newstitle: "",
            newsdes: "",
            newsid: "",
            inputs_CATEGORYS: [],
            inputs_REFERENCES: [],
            idCounter_CATEGORY: 0,
            idCounter_REFERENCE: 0,
        }
    },
    created() {
        this.idCounter_CATEGORY = this.inputs_CATEGORYS.length
        this.idCounter_REFERENCE = this.inputs_REFERENCES.length
    },
    mounted() {
        this.getnews(this.$route.params.newsId)
    },
    methods: {
        getnews(newsId) {
            axios.get(`http://localhost:5000/news/${newsId}/edit`)
                .then((response) => {
                    this.newstitle = response.data.news[0].news_title
                    this.newsdes = response.data.news[0].news_desc
                    this.newsid = response.data.news[0].news_id
                    this.inputs_CATEGORYS = [...response.data.category]
                    this.inputs_REFERENCES = [...response.data.reference]
                })
                .catch((error) => {
                    alert(error.response.data)
                });
        },
        editnews() {
            var formData = new FormData();
            var imagefile = document.querySelector('#news');
            formData.append("news", imagefile.files[0]);
            formData.append('news_id', this.newsid);
            formData.append('news_title', this.newstitle);
            formData.append('news_des', this.newsdes);
            formData.append('news_cat', JSON.stringify(this.inputs_CATEGORYS));
            formData.append('news_ref', JSON.stringify(this.inputs_REFERENCES));
            axios.put(`http://localhost:5000/editnews`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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