<template>
    <div class="login-box m-auto my-5">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <h2>Perpustakaan Sekolah</h2>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Masukkan Email dan Password</p>

                <form @submit.prevent="login">
                    <div class="input-group mb-3">
                    <input type="email" class="form-control" placeholder="Email" v-model="email">
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Password" v-model="password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
// import { response } from 'express';
import axios from 'axios';
import swal from 'sweetalert';
// import Vue from 'vue'


export default {
    data() {
        return {
            email: '',
            password :'',
        }
    },
    created() {
        if(this.$store.state.token !== '') {
            this.axios.post('http://localhost:8000/api/checkToken', { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} }
)
                      .then(response => {
                        console.log(response)
                          this.$router.push('/siswa')
                      })
                      .catch(err => {
                        console.log(err)
                          this.$store.commit('clearToken')
                      })
        }

        
    },
    methods : {
        login(){
            
                var data ={
                    email: this.email,
                    password : this.password
                }
            axios.post('http://localhost:8000/api/login', data)
            .then(
                (response) => {
                    this.$store.commit('setToken',response.data.token)
                    location.href = '/siswa'
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                    swal('salah',{
                    icon: 'error'})
                }
            )      
                        }
},
mounted(){
    this.$emit('authenticated', false)
}

}

        
        
    
</script>
