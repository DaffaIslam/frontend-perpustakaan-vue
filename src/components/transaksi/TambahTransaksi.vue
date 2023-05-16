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
                                    <h3 class="card-title">Transaksi baru</h3>
                                </div>
                                <form @submit.prevent="save">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Nama Siswa :</label>
                                            <select v-model="pinjam.id_siswa" id="" class="form-control">
                                            <option v-for="s in siswa" :key="s.id_siswa" :value="s.id_siswa">{{ s.nama_siswa }}</option>
                                            </select>
                                        </div>                                        
                                        <div class="form-group">
                                            <label>Kelas :</label>
                                            <select v-model="pinjam.id_kelas" id="" class="form-control">
                                            <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
                                            </select>
                                        </div>  
                                        <div class="form-group">
                                            <label>Buku :</label>
                                            <select v-model="pinjam.id_buku" id="" class="form-control">
                                            <option v-for="b in buku" :key="b.id_buku" :value="b.id_buku">{{ b.judul_buku }}</option>
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
            kelas : {},
            buku : {},
            pinjam : {},
        }
    },
    created() {   
        this.Getkelas();
        this.Getsiswa();
        this.getbuku();
             
    },
    methods : { 
        save(){
            this.save_data();
        },
        save_data(){
            axios.post('http://localhost:8000/api/createpeminjaman', this.pinjam)
            .then(
                ({data}) => {
                    swal({
                        title: "Sukses Tambah Transaksi",
                        icon: "success"
                    })
                    this.$router.push('/transaksi');
                    this.siswa = data;
                }
            )
        },
        Getsiswa(){
            axios.get("http://localhost:8000/api/getsiswa").then(
                ({data})=>{
                    this.siswa = data }
            )
        },
        Getkelas(){
            axios.get("http://localhost:8000/api/getkelas").then(
                ({data})=>{
                    this.kelas= data }
            )
        },
        getbuku(){
            axios.get("http://localhost:8000/api/getbuku").then(
                ({data})=>{
                    this.buku= data }
            )
        }

    

        
    }
}
</script>
