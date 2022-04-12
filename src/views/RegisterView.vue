<script setup>
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="field">
                <div class="control">
                    <label class="label is-size-4">USERNAME</label>
                    <input class="input" type="text" placeholder="USERNAME">
                </div>
            </div>
            <div class="field-body mb-2">
                <div class="column is-6 pl-0 py-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">PASSWORD</label>
                            <input class="input" type="text" placeholder="PASSWORD">
                        </div>
                    </div>
                </div>
                <div class="column is-6 pr-0 py-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">CONFIRM PASSWORD</label>
                            <input class="input" type="text" placeholder="CONFIRM PASSWORD">
                        </div>
                    </div>
                </div>
            </div>
            <div class="field-body mb-2">
                <div class="column is-6 pl-0 py-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">E-MAIL</label>
                            <input class="input" type="text" placeholder="E-MAIL">
                        </div>
                    </div>
                </div>
                <div class="column is-6 pr-0 py-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">PHONE</label>
                            <input class="input" type="text" placeholder="PHONE">
                        </div>
                    </div>
                </div>
            </div>
            <div class="field-body mb-2">
                <div class="column is-2 mt-auto py-0 pl-0">
                    <div class="field ">
                        <div class="select is-fullwidth">
                            <select>
                                <option></option>
                                <option>Mr.</option>
                                <option>Mrs.</option>
                                <option>Miss</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="column is-4 py-0 pl-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">FIRST NAME</label>
                            <input class="input" type="text" placeholder="FIRST NAME">
                        </div>
                    </div>
                </div>
                <div class="column is-6 pr-0 py-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">LAST NAME</label>
                            <input class="input" type="text" placeholder="LAST NAME">
                        </div>
                    </div>
                </div>
            </div>
            <div class="field-body mb-2">
                <div class="column is-5 py-0 pl-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">BIRTH DATE</label>
                            <input class="input" type="date" placeholder="BIRTH DATE">
                        </div>
                    </div>
                </div>
                <div class="column is-4 py-0 pl-0">
                    <div class="field">
                        <div class="control">
                            <label class="label is-size-4 has-text-left">NATIONALITY</label>
                            <input class="input" type="text" placeholder="NATIONALITY">
                        </div>
                    </div>
                </div>
                <div class="column is-3 mt-auto py-0 pr-0">
                    <div class="field">
                        <label class="label is-size-4 has-text-left">BLOOD</label>
                        <div class="select is-fullwidth">
                            <select>
                                <option></option>
                                <option>A</option>
                                <option>B</option>
                                <option>O</option>
                                <option>AB</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field-body mb-2">
                <div class="field">
                    <div class="control">
                        <label class="label is-size-4 has-text-left">ADDRESS</label>
                        <textarea class="textarea" type="text" placeholder="ADDRESS"></textarea>
                    </div>
                </div>
                <div class="file is-large is-boxed mt-auto">
                    <label class="file-label  ">
                        <input class="file-input" type="file" name="resume">
                        <span class="file-cta has-text-centered" style="height: 160px; justify-content: center;">
                            <span class="file-icon m-0">
                                <i class="fa fa-plus "></i>
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div class="mt-3 has-text-centered">
                <button
                    class="button is-primary has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold is-fullwidth">Create
                    Account</button>
            </div>
        </div>
    </div>
</template>

<style>
</style>