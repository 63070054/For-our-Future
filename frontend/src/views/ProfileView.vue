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
                        <button @click="editAble = true" class="button is-small ml-6"
                            style="font-size: 20px; color: #0F1123; margin-top: 30px;"><i class="fa fa-pen"></i>
                            แก้ไขโปรไฟล์</button>
                    </div>
                    <div class="column is-mobile">
                        <router-link :to="{'path': '/profile/ScoreUser'}">
                            <button class="button is-small ml-6  has-background-black-ter has-text-white-ter" 
                            style="font-size: 20px; margin-top: 30px;">
                            คะแนนของคุณ</button>
                        </router-link>
                        
                    </div>
                </div>
            </div>
            <div style="background-color: #0F1123; width: 17%; height:25px; top: 60%"></div>
            <div style="background-color: #0F1123; width: 35%; height:25px; top: 75%"></div>
            <img :src="'http://localhost:5000/' + pic"
                style="border-radius: 50%; width:215px; height:215px; top: 20%; left: 75%;border:15px solid #83CFC1;">
        </div>
        <div class="columns is-centered column-res">
            <div class="column is-half">
                <div class="field">
                    <div class="control">
                        <label class="label is-size-4">USERNAME</label>
                        <input disabled v-model="username" class="input" type="text" placeholder="USERNAME">
                    </div>
                </div>
                <div class="field-body mb-2">
                    <div class="column is-6 pl-0 py-0">
                        <div class="field">
                            <div class="control">
                                <label class="label is-size-4 has-text-left">E-MAIL</label>
                                <input :disabled="!editAble" v-model="email" class="input" type="text" placeholder="E-MAIL">
                            </div>
                        </div>
                    </div>
                    <div class="column is-6 pr-0 py-0">
                        <div class="field">
                            <div class="control">
                                <label class="label is-size-4 has-text-left">PHONE</label>
                                <input :disabled="!editAble" v-model="phone" class="input" type="number" placeholder="PHONE">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field-body mb-2">
                    <div class="column is-2 mt-auto py-0 pl-0">
                        <div class="field ">
                            <div class="select is-fullwidth">
                                <select v-model="sex" :disabled="!editAble">
                                    <option>male</option>
                                    <option>female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4 py-0 pl-0">
                        <div class="field">
                            <div class="control">
                                <label class="label is-size-4 has-text-left">FIRST NAME</label>
                                <input :disabled="!editAble"  v-model="f_name" class="input" type="text" placeholder="FIRST NAME">
                            </div>
                        </div>
                    </div>
                    <div class="column is-6 pr-0 py-0">
                        <div class="field">
                            <div class="control">
                                <label class="label is-size-4 has-text-left">LAST NAME</label>
                                <input :disabled="!editAble" v-model="l_name" class="input" type="text" placeholder="LAST NAME">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field-body mb-2">
                    <div class="column is-5 py-0 pl-0">
                        <div class="field">
                            <div class="control">
                                <label class="label is-size-4 has-text-left">BIRTH DATE</label>
                                <input :disabled="!editAble" v-model="date" class="input" type="date" placeholder="BIRTH DATE">
                            </div>
                        </div>
                    </div>
                    <div class="column is-4 py-0 pl-0">
                        <div class="field">
                            <div class="control">
                                <label class="label is-size-4 has-text-left">NATIONALITY</label>
                                <input :disabled="!editAble" v-model="nationlity" class="input" type="text" placeholder="NATIONALITY">
                            </div>
                        </div>
                    </div>
                    <div class="column is-3 py-0 pr-0">
                        <div class="field">
                            <label class="label is-size-4 has-text-left">BLOOD</label>
                            <div  class="select is-fullwidth">
                                <select v-model="blood" :disabled="!editAble">
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
                            <textarea v-model="add" class="textarea" type="text" placeholder="ADDRESS"></textarea>
                        </div>
                    </div>
                </div>
                <div class="mt-3 has-text-centered" v-if="editAble">
                    <button @click="cancelEdit" class="button is-white has-text-centered mx-6" style="background-color: #0F1123; width:60px; height:60px">
                        <span style="color: #FF7070;">
                            <i class="fas fa-times fa-3x"></i>
                        </span>
                    </button>
                    <button @click="saveInfo" class="button is-white has-text-centered mx-6" style="background-color: #0F1123; width:60px; height:60px">
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
    props: ['user'],
    data() {
    return {
        editAble: false,
        username: '',
        f_name: '',
        l_name:'',
        email:'',
        phone:'',
        date: '',
        nationlity: '',
        blood:'',
        add:'',
        sex: '',
        pic:''
    };
  },
  async created() {
      await this.setProfile()
      console.log(this.user)
  },
  methods: {
      async setProfile(){
          this.username = this.user.username
          this.f_name = this.user.f_name
          this.l_name = this.user.l_name
          this.email = this.user.email
          this.phone = this.user.phone
          this.date = this.user.date
          this.nationlity = this.user.nationlity
          this.blood = this.user.blood_type
          this.add = this.user.addres
          this.sex = this.user.sex
          this.pic = this.user.picture
      },
      cancelEdit(){
          this.editAble = false
          this.setProfile()
      },
      saveInfo() {
      axios.put(`http://localhost:5000/profile`, {
        "username": this.username,
        "f_name": this.f_name,
        "l_name":this.l_name,
        "email":this.email,
        "phone":this.phone,
        "date": this.date,
        "nationlity": this.nationlity,
        "blood":this.blood,
        "add":this.add,
        'sex': this.sex,
      })
        .then((response) => {
          console.log(response.data.message)
          this.editAble = false
          alert("แก้ไขข้อมูลเสร็จสิ้น")
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
    },
  }
}
</script>