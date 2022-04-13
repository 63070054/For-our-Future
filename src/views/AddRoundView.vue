<script setup>
</script>

<template>
    <div style="background-color: #F9F7F0; width:100%; height: calc(100vh - 53px)">
        <div style="background-color: #DE8971; width:100%; height:315px;">
            <div style="background-color: #0F1123; width:100%; height:300px;">
                <img src="https://static.trueplookpanya.com/tppy/member/m_525000_527500/525016/cms/images/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%A2%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B8%AA%E0%B8%88%E0%B8%A5%20(7).jpg"
                    style="height: 300px; width: 100%; opacity: 0.3;" />
                <div style="position: absolute; top: 50%;left: 50%; transform: translate(-50%, -50%);">
                    <p class="is-size-1 has-text-centered has-text-white">ชื่อมหาวิทยาลัย</p>
                    <p class="is-size-2 has-text-centered has-text-white">คณะ................</p>
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="field">
                    <label class="label is-size-4">ROUND <span class="has-text-danger">*</span></label>
                    <div class="select is-fullwidth">
                        <select>
                            <option>ROUND 1</option>
                            <option>ROUND 2</option>
                            <option>ROUND 3</option>
                            <option>ROUND 4</option>
                            <option>ROUND 5</option>
                        </select>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label is-size-4 has-text-left">ROUND DESCIPTION</label>
                        <textarea class="textarea" type="text" placeholder="ROUND DESCIPTION"></textarea>
                    </div>
                </div>
                <label class="label is-size-4 has-text-left">ROUND DESCIPTION
                    <span>
                        <i class="fa fa-plus "></i>
                    </span>
                </label>
                <div class="field-body mb-2">
                    <div class="column is-3 py-0 pl-0 pr-2">
                        <div class="field ">
                            <div class="select is-fullwidth">
                                <select>
                                    <option>O-NET</option>
                                    <option>GAT</option>
                                    <option>PAT</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6 py-0 pl-0">
                        <div class="field">
                            <div class="select is-fullwidth">
                                <select>
                                    <option>ภาษาไทย</option>
                                    <option>คณิต</option>
                                    <option>สังคม</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="column is-2 pl-0 py-0">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="column is-1 py-0 pr-0">
                        <div class="field">
                            <div class="control">
                                <button class="button is-white has-text-centered is-fullwidth">
                                    <span style="color: #6EBF8B;">
                                        <i class="fas fa-check fa-2x"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-3 has-text-centered">
                    <button
                        class="button is-warning has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth">Create
                        Round
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>