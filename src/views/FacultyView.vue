<script setup>
import CardRound from '../components/CardRound.vue';
import IconAdd from "@/components/icons/IconAdd.vue";
</script>
<template>
    <div style="background-color: #f9f7f0; width: 100%" class="hero is-fullheight-with-navbar ">
        <div style="background-color: #de8971; width: 100%; height: 315px">
            <div style="background-color: #0f1123; width: 100%; height: 300px">
                <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            ">
                    <p class="is-size-1 has-text-centered has-text-white">
                        ชื่อมหาวิทยาลัย
                    </p>
                </div>
            </div>
        </div>
        <div class="container my-5" style="width:80%">
                <div class="select is-medium is-full" style="width:100%">
                    <select style="width:100%">
                        <option>ชื่อคณะ</option>
                        <option>With options</option>
                    </select>
                </div>
                <h1 class="title has-text-weight-bold">รายละเอียดคณะ</h1>
                <CardRound></CardRound>
        </div>
        <IconAdd></IconAdd>
    </div>
</template>