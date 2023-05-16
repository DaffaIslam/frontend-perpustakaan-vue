<template>
    <div>
        <AppNavbar-component></AppNavbar-component>
        <AppSidebar-component></AppSidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Form Tambah Data</h1>
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
                                    <h3 class="card-title">Anggota Baru</h3>
                                </div>
                                <form @submit.prevent="save">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Nama Anggota</label>
                                            <input type="text" class="form-control" v-model="siswa.nama_siswa">
                                        </div>                                        
                                        <div class="form-group">
                                            <label>Tanggal Lahir</label>
                                            <input type="date" class="form-control" id="example-datepicker"  v-model="siswa.tanggal_lahir">
                                        </div>
                                        <div class="form-group">
                                            <div>
                                                <label>Jenis Kelamin</label>
                                            </div>
                                            <div class="btn-group btn-group-toggle" data-toggle="buttons">                                                
                                                <label class="btn btn-secondary">
                                                    <input type="radio" value="laki-laki" v-model="siswa.gender"> Laki-laki
                                                </label>
                                                <label class="btn btn-secondary">
                                                    <input type="radio" value="perempuan" v-model="siswa.gender"> Perempuan
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Alamat</label>
                                            <textarea rows="4" class="form-control" v-model="siswa.alamat"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Kelas</label>
                                            <select class="form-control" v-model="siswa.id_kelas" id="kelas">                                                   
                                                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas" >{{ k.nama_kelas }}</option>
                                            </select>
                                                
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" class="btn btn-primary">Simpan</button>
                                    </div>
                                </form>
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

    data() {
        return {
            siswa : {},
            kelas : {}
        }
    },
    created() {   
        this.Datakelas();
             
    },
    methods : { 
        Datakelas(){
         
            axios.get("http://localhost:8000/api/getkelas")
            .then(
                ({data})=>{
                    this.kelas = data }
            );
        },
        save(){
            this.save_data();
        },
        save_data(){
            axios.post('http://localhost:8000/api/createsiswa', this.siswa)
            .then(
                ({data}) => {
                    swal({
                        title: "Sukses tambah siswa",
                        icon: "success"
                    })
                    this.$router.push('/siswa');
                    this.siswa = data;
                }
            )
        },
    

        
    }
}
</script>
