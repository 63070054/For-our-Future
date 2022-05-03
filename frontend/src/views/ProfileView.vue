<script setup>
</script>

<template>
    <div style="background-color: #F4A3A3; width:100%; height: 100%; min-height: 100%">
        <div style="background-color: #83CFC1; width:100%; height:200px;">
            <div style="position: absolute; top: 5%; left: 5%;">
                <div class="columns is-mobile">
                    <div class="column is-mobile">
                        <p class="has-text-weight-bold" style="font-size: 65px; color: #0F1123">PROFILE</p>
                    </div>
                    <div class="column is-mobile">
                        <button class="button is-small ml-6"
                            style="font-size: 20px; color: #0F1123; margin-top: 30px;"><i class="fa fa-pen"></i>
                            แก้ไขโปรไฟล์</button>
                    </div>
                    <div class="column is-mobile">
                        <router-link :to="{'path': '/profile/USERNAME/ScoreUser'}">
                            <button class="button is-small ml-6  has-background-black-ter has-text-white-ter" 
                            style="font-size: 20px; margin-top: 30px;">
                            คะแนนของคุณ</button>
                        </router-link>
                        
                    </div>
                </div>
            </div>
            <div style="background-color: #0F1123; width: 17%; height:25px; top: 60%"></div>
            <div style="background-color: #0F1123; width: 35%; height:25px; top: 75%"></div>
            <img src="https://wallpaperaccess.com/full/6155602.jpg"
                style="border-radius: 50%; width:215px; height:215px; top: 20%; left: 75%;border:15px solid #83CFC1;">
        </div>
        <div class="columns is-centered column-res">
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
                    <div class="column is-6 pr-0 py-0 ">
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
                    <div class="column is-3 py-0 pr-0">
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
                </div>
                <div class="mt-3 has-text-centered">
                    <button class="button is-white has-text-centered mx-6" style="background-color: #0F1123; width:60px; height:60px">
                        <span style="color: #FF7070;">
                            <i class="fas fa-times fa-3x"></i>
                        </span>
                    </button>
                    <button class="button is-white has-text-centered mx-6" style="background-color: #0F1123; width:60px; height:60px">
                        <span style="color: #6EBF8B;">
                            <i class="fas fa-check fa-3x"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@media only screen and (max-width: 768px) {
.column-res{
    padding-top: 70px;
}
}
</style>
<script>
import axios from '@/plugins/axios'
export default {
    data() {
    return {
      
    };
  },
  async mounted() {
      await this.getProfile();
  },
  methods: {
      async getProfile() {
      await axios
        .get(`http://localhost:5000/profile`)
        .then((response) => {
            console.log('test')
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  }
}
</script>