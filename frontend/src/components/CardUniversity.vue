<script setup>

</script>
<template>
    <main>
        <router-link :to="`/${uni_info.uni_name}/edit`" style="position:absolute; right: 60px; top: 10px; z-index: 2;" v-if="user && user.type_user == 'admin'">
            <button class="button is-info is-small" type="button">
                <span class="icon">
                    <i class="fas fa-pen" style="font-size: 16px;"></i>
                </span>
            </button>
        </router-link>
        <button v-if="user && user.type_user == 'admin'" class="button is-danger is-small" type="button" style="position:absolute; right: 20px; top: 10px; z-index: 2;"
            @click="deleteUniversity(uni_info)">
            <span class="icon">
                <i class="fas fa-trash-alt" style="font-size: 16px;"></i>
            </span>
        </button>
        <router-link :to="`/${uni_info.uni_name}/faculty`">
            <div class="card is-full my-3 mx-2 columns brown1">
                <div class="card-image column ">
                    <figure class="image image is-1by1">
                        <img :src="`http://localhost:5000/` + uni_info.file_path" style="object-fit: contain; width: 100%; aspect-ratio: 1/1; object-position: top center;">
                    </figure>
                </div>
                <div class="column is-four-fifths" style="position:relative;">



                    <div class="card-content ">
                        <div class="title is-size-3">{{ uni_info.uni_name }}</div>
                        <div>
                            <p class="tag is-size-6" style="user-select: none; cursor: pointer;">{{ uni_info.region_name
                            }}
                            </p>
                            <p class="tag is-size-6 ml-2" style="user-select: none; cursor: pointer;">{{
                                    uni_info.province_name
                            }}
                            </p>
                        </div>

                    </div>
                    <div class="subtitle has-text-white is-size-5 mr-3 mb-3"
                        style="position:absolute; bottom:0px; right:0px;">
                        {{ uni_info.u_edited_date.substr(0, 10) }}</div>
                </div>

            </div>
        </router-link>
    </main>
</template>
<script>

export default {
    props: ['uni_info', 'user'],
    data() {
        return {}
    },
    methods: {
        deleteUniversity(uni) {
            this.$emit("delete-university");
        },
    }
}
</script>
<style>
.brown1 {
    background-color: #DE8971;
}
</style>