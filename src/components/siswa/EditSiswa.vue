<template>
    <div>
        <AppNavbar-component></AppNavbar-component>
        <AppSidebar-component></AppSidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Anggota</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card card-info">
                                <div class="card-header">
                                    <h3 class="card-title">Edit Siswa</h3>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="edit">
                                        <input type="hidden" v-model="id_siswa">
                                        <label for="nama" class="form-label">Nama:</label>
                                        <input type="text" class="form-control" v-model="nama_siswa" id="nama" autocomplete="off" placeholder="Masukkan nama..">
                                        
                                        <label for="tgl_lahir" class="form-label">Tanggal Lahir:</label>
                                        <input type="date" class="form-control" v-model="tanggal_lahir" id="tgl_lahir">
                                        
                                        <label for="gender" class="form-label">Gender:</label>
                                        <select v-model="gender" id="gender" class="form-control">
                                            <option value="laki-laki">Laki-laki</option>
                                            <option value="perempuan">Perempuan</option>
                                        </select>
                                        
                                        <label for="alamat" class="form-label">Alamat:</label>
                                        <input type="text" v-model="alamat" id="alamat" class="form-control">
                                        
                                        <label for="kelas">Kelas:</label>
                                        <select v-model="id_kelas" id="kelas" class="form-control">
                                            <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
                                        </select>
                                        
                                        <br>
                                        <input type="submit"  class="btn btn-info">
                                        
                                        
                                       </form>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    
</template>
<script>

import Vue from 'vue';
import axios from 'axios';
import swal from 'sweetalert';

Vue.use(axios);


export default {
   
    data : function (){
        return{
                siswa: [],
                    id_siswa: "",
                    nama_siswa: "",
                    tanggal_lahir: "",
                    gender: "",
                    alamat: "",
                    id_kelas: "",
                kelas: {},
        }
   },
   mounted(){
    this.GetSiswa(),
    this.getdetail(this.$route.params.id),
    this.DataKelas()
   },
   
    
    methods : {
        GetSiswa (){
            axios.get('http://localhost:8000/api/getsiswa')
            .then(
                ({data}) => {
                    this.siswa = data
                }
            );
        },
        DataKelas(){
            axios.get('http://localhost:8000/api/getkelas')
            .then(
            ({data}) => {
                this.kelas = data
            }
        );
        },
        getdetail(id_siswa){
            axios.get('http://localhost:8000/api/siswalol/' + id_siswa)
            .then((response) => {
                console.log(response.data[0])
                this.id_siswa = response.data[0].id_siswa
                this.id_kelas = response.data[0].id_kelas
                this.nama_siswa = response.data[0].nama_siswa
                this.tanggal_lahir = response.data[0].tanggal_lahir
                this.gender = response.data[0].gender
                this.alamat = response.data[0].alamat
            })
       
    },

    edit: function(){
            let DataSiswa = {
                id_siswa : this.id_siswa,
                id_kelas : this.id_kelas,
                nama_siswa : this.nama_siswa,
                tanggal_lahir : this.tanggal_lahir,
                gender : this.gender,
                alamat: this.alamat,
            }
            axios.put("http://localhost:8000/api/updatesiswa/" + this.id_siswa , DataSiswa)
            .then(
              res => {
                swal({
                        title: "Sukses Update siswa",
                        icon: "success"
              })
                console.log(res)
                this.$router.push('/siswa')
              }
               
            )
    }
 }
}
</script>
