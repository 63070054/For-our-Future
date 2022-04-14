<script setup>
</script>
<template>
        <div class="card is-full my-3 mx-2 columns brown1">
            <div class="card-image column ">
                <figure class="image image is-1by1">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqlbdKffhIO6z9r4nz-576As4odORM797QqADx62SdfoMXqZCxFQ65bcgEF8bpsGNB2E&usqp=CAU">
                </figure>
            </div>
            <div class="column is-four-fifths" style="position:relative;">
                <div class="card-content ">
                    <div class="title is-size-3">{{uni_info.name}}</div>
                    <div>
                        <p class="tag is-size-6" style="user-select: none; cursor: pointer;">{{uni_info.region}}</p>
                        <p class="tag is-size-6 ml-2" style="user-select: none; cursor: pointer;">{{uni_info.province}}</p>
                    </div>
                
                </div>
                <div class="subtitle has-text-white is-size-5 mr-3 mb-3" style="position:absolute; bottom:0px; right:0px;">
                    {{uni_info.editedDate}}</div>
            </div>
            
        </div>
    <!-- </div> -->
</template>
<script>
export default {
    props: ['uni_info'],
}
</script>
<style>
.brown1{
    background-color:#DE8971;
}
</style>