<script setup>
</script>
<template>
    <div class="card is-full my-3 mx-2 columns brown1">
        <div class="card-image column ">
            <figure class="image image is-1by1">
                <img src="http://localhost:5000/images/resume-1650984280714.jpeg">
            </figure>
        </div>
        <div class="column is-four-fifths" style="position:relative;">
            <div>
            <button class="button is-info is-small" type="button" style="position:absolute; right: 60px; z-index: 2;" @click="edituni">
                <span class="icon">
                    <i class="fas fa-pen" style="font-size: 16px;"></i>
                </span>
            </button>
            <button class="button is-danger is-small" type="button" style="position:absolute; right: 20px; z-index: 2;">
                <span class="icon">
                    <i class="fas fa-trash-alt" style="font-size: 16px;"></i>
                </span>
            </button></div>
            <div class="card-content ">
                <div class="title is-size-3">{{ uni_info.uni_name }}</div>
                <div>
                    <p class="tag is-size-6" style="user-select: none; cursor: pointer;">{{ uni_info.region_name }}</p>
                    <p class="tag is-size-6 ml-2" style="user-select: none; cursor: pointer;">{{ uni_info.province_name }}
                    </p>
                </div>

            </div>
            <div class="subtitle has-text-white is-size-5 mr-3 mb-3" style="position:absolute; bottom:0px; right:0px;">
                {{ uni_info.u_edited_date.substr(0, 10) }}</div>
        </div>

    </div>
    <!-- </div> -->
</template>
<script>
import axios from 'axios';

export default {
    props: ['uni_info'],
    
    methods: {
    edituni() {
        console.log('ok')
        console.log(uni_info);
    }
  }
}
</script>
<style>
.brown1 {
    background-color: #DE8971;
}
</style>