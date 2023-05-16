<template>
    <div>
        <AppNavbar-component></AppNavbar-component>
        <AppSidebar-component></AppSidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Anggota</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <router-link class="btn btn-info mb-2" to="/siswa/tambahsiswa">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">#</th>
                                            <th>Nama Lengkap</th>
                                            <th>Kelas</th>
                                            <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(s,index) in siswa" :key="s.id_siswa">
                                                <td>{{ index + 1}}</td>
                                                <td>{{ s.nama_siswa }}</td>
                                                
                                                <td>{{ s.nama_kelas }}</td>
                                                
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link class="btn btn-success" :to="{ }">Detail</router-link>                                                        
                                                        <router-link class="btn btn-warning" :to="{ path: '/editsiswa/' + s.id_siswa}" >Edit</router-link>  
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

// import AppNavbar from '.../components/template/AppNavbar.vue';
// import AppSidebar from '../components/template/AppSidebar.vue';


export default {
//     components:{
//     'AppNavbar-component' : AppNavbar,
//     'AppSidebar-component' : AppSidebar,
//   },

    data() {
        return {
            siswa : {}
        }
    },
    created() {
        this.getsiswa();
        
    },
   

     methods : {
        getsiswa(){
            var page = "http://localhost:8000/api/getsiswa";
            axios.get(page).then(
                ({data})=>{
                    console.log(data);
                    this.siswa = data;
                }
            );
        },
        hapus(s){
            
            axios.delete('http://localhost:8000/api/deletesiswa/'+ s.id_siswa)
            
            .then(
                (response) => {
                    swal({
                        title: "Sukses delete siswa",
                        icon: "success"
                    })
                    this.$router.push('/siswa');
                    this.siswa = response;
                    
                }
            )
        }
       
     }
}
</script>
