<script setup>
</script>
<template>
    <div style="background-color: #DBF6E9 ; min-height: calc(100vh - 3.25rem);" class=" p-3">
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="field">
                    <label class="label is-size-4">NEWS TITLE <span style="color: red">*</span></label>
                    <input class="input" type="text" />
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS DESCRIPTION <span style="color: red">*</span></label>
                    <textarea class="textarea" rows="2"></textarea>
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS CATEGORY <span class="icon">
                            <i class="fas fa-plus"></i>
                        </span></label>
                    <div class="columns">
                        <div class="column is-11">
                            <div class="input"></div>
                        </div>
                        <div class="column">
                            <button class="button" type="button">
                            <span class="icon">
                                <i class="fas fa-2x fa-check" style="background-color: #6EBF8B"></i>
                            </span></button>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label is-size-4">NEWS REFFERENCES <span class="icon">
                            <i class="fas fa-plus"></i>
                        </span></label>
                    <div class="columns">
                        <div class="column is-11">
                            <div class="input"></div>
                        </div>
                        <div class="column">
                            <button class="button" type="button">
                            <span class="icon">
                                <i class="fas fa-2x fa-check " style="background-color: #6EBF8B"></i>
                            </span></button>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <div class="file is-large is-boxed mt-auto">
                        <label class="file-label" style="width: 100%;">
                            <input class="file-input" type="file" name="resume" />
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
                        style="background-color: #9DDFD3">
                        Create News
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>