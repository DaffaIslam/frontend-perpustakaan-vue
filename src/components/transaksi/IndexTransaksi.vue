<template>
     <div>
        <AppNavbar-component></AppNavbar-component>
        <AppSidebar-component></AppSidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Transaksi</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-mb-2">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <router-link class="btn btn-info mb-2" to="/transaksi/tambahtransaksi">
                                        <i class="fas fa-plus"></i> Transaksi
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">#</th>
                                            <th>Nama Siswa</th>
                                            <th>Kelas</th>
                                            <th>Buku</th>
                                            <th>Status</th>
                                            <th>Tanggal Pinjam</th>
                                            <th>Tanggal kembali</th>
                                            <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(s,index) in peminjaman" :key="s.id_peminjaman" >
                                                <td>{{ index + 1}}</td>
                                                <td>{{ s.nama_siswa }}</td>
                                                <td>{{ s.nama_kelas }}</td>
                                                <td>{{ s.judul_buku }}</td>
                                                <td>
                                                    <span v-if="s.status == 'dipinjam'" class="btn btn-danger">Di pinjam </span>
                                                    <span v-else class="btn btn-success">Kembali</span>
                                                </td>
                                                <td>{{ s.tglpinjam  }}</td>
                                                <td>{{ s.tglkembali }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                                                                               
                                                        <span v-if="s.status == 'dipinjam'"><button class="btn btn-primary" @click="kembali(s)">Kembali</button></span> 
                                                        <button type="button" @click="hapus(s)" class="btn btn-danger">Hapus</button>                                                      
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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


    data() {
        return {
            peminjaman : {},
            
                
        }
    },
    created() {
        this.getpeminjaman();
        
    },
   

     methods : {
        getpeminjaman(){
            var page = "http://localhost:8000/api/getpeminjaman";
            axios.get(page).then(
                ({data})=>{
                    console.log(data);
                    this.peminjaman = data;
                }
            );
        },
        
        hapus(s){
            
            axios.delete('http://localhost:8000/api/deletepeminjaman/'+ s.id_peminjaman)
            
            .then(
                (response) => {
                    swal({
                        title: "Sukses delete ",
                        icon: "success"
                    })
                    this.$router.push('/transaksi');
                    this.siswa = response;
                    
                }
            )
        },
        kembali(s){
            axios.put('http://localhost:8000/api/balik/'+ s.id_peminjaman)
            .then(
                (response) => {
                    console.log(response)
                    swal({
                        icon: 'success',
                        title: 'Sukses kembalikan peminjaman' 
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 1200);
                }
            )

        }
        
       
     }
} 


</script>