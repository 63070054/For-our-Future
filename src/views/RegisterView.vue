<script setup>
</script>

<template>
    <div class="field column is-half is-offset-one-quarter">
        <div class="field-body mb-2" style="width: 700px">
            <div class="field">
                <div class="control">
                    <label class="label is-size-4 has-text-left">USERNAME <br>
                        <input class="input" type="text" placeholder="USERNAME">
                    </label>
                </div>
            </div>
        </div>
        <div class="field-body mb-2" style="width: 700px">
            <div class="field" style="width: 350px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">PASSWORD <br>
                        <input class="input" type="text" placeholder="PASSWORD">
                    </label>
                </div>
            </div>
            <div class="field" style="width: 350px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">CONFIRM PASSWORD<br>
                        <input class="input" type="text" placeholder="CONFIRM PASSWORD">
                    </label>
                </div>
            </div>
        </div>
        <div class="field-body mb-2" style="width: 700px">
            <div class="field" style="width: 350px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">E-MAIL<br>
                        <input class="input" type="text" placeholder="E-MAIL">
                    </label>
                </div>
            </div>
            <div class="field" style="width: 350px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">PHONE<br>
                        <input class="input" type="text" placeholder="PHONE">
                    </label>
                </div>
            </div>
        </div>
        <div class="field-body mb-2" style="width: 700px">
            <div class="field mt-auto" style="width: 60px">
                <div class="control">
                    <div class="select">
                        <select>
                            <option></option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Miss</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field" style="width: 280px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">FIRST NAME<br>
                        <input class="input" type="text" placeholder="FIRST NAME">
                    </label>
                </div>
            </div>
            <div class="field" style="width: 350px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">LAST NAME<br>
                        <input class="input" type="text" placeholder="LAST NAME">
                    </label>
                </div>
            </div>
        </div>
        <div class="field-body mb-2" style="width: 700px">
            <div class="field" style="width: 220px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">BIRTH DATE<br>
                        <input class="input" type="date" placeholder="BIRTH DATE">
                    </label>
                </div>
            </div>
            <div class="field" style="width: 270px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">NATIONALITY<br>
                        <input class="input" type="text" placeholder="NATIONALITY">
                    </label>
                </div>
            </div>
            <div class="field mt-auto" style="width: 30px">
                <div class="control">
                    <label class="label is-size-4 has-text-left mb-0" >BLOOD<br></label>
                    <div class="select">
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
        <div class="field-body mb-2" style="width: 700px">
            <div class="field" style="width: 350px">
                <div class="control">
                    <label class="label is-size-4 has-text-left">ADDRESS <br>
                        <textarea class="textarea" type="text" placeholder="ADDRESS"></textarea>
                    </label>
                </div>
            </div>
            <div class="file is-large is-boxed mt-auto">
                <label class="file-label  ">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta has-text-centered" style="height: 160px; justify-content: center;">
                        <span class="file-icon m-0">
                            <i class="fa fa-plus "></i>
                        </span>
                        <!-- <span class="file-label">
                            อัพโหลดรูป
                        </span> -->
                    </span>
                </label>
            </div>
        </div>
        <div class="mt-3">
            <button class="button is-primary has-text-black has-text-centered is-3 is-size-4 has-text-weight-bold"
                style="width: 700px">Create Account</button>
        </div>
    </div>


</template>

<style>
</style>