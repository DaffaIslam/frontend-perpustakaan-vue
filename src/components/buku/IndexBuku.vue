<template>
    <div>
        <AppNavbar-component></AppNavbar-component>
        <AppSidebar-component></AppSidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data buku</h1>
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
                                    <router-link class="btn btn-info mb-2" to="/buku/tambahbuku">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">#</th>
                                            <th>Judul buku</th>
                                            <th>Pengarang</th>
                                            <th>Aksi</th>

                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(s,index) in buku" :key="s.id_buku">
                                                <td>{{ index + 1}}</td>
                                                <td>{{ s.judul_buku }}</td>
                                                
                                                <td>{{ s.pengarang}}</td>
                                                
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link class="btn btn-success" :to="{ }">Detail</router-link>                                                        
                                                        <router-link class="btn btn-warning" :to="{ path: '/EditBuku/' + s.id_buku}" >Edit</router-link>  
                                                        <button type="button" @click="hapus(s.id)" class="btn btn-danger">Hapus</button>                                                      
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
        buku : {}
        }
    },
    created() {
        this.getbuku();
        
    },
   
    
     methods : {
        getbuku(){
            var page = "http://localhost:8000/api/getbuku";
            axios.get(page).then(
                ({data})=>{
                    
                    console.log(data);
                    this.buku = data;
                }
            );
        },
        hapus(s){
            
            axios.delete('http://localhost:8000/api/deletebuku/'+ s.id_buku)
            
            .then(
                (response) => {
                    swal({
                        title: "Sukses delete buku",
                        icon: "success"
                    })
                    this.$router.push('/buku');
                    this.buku = response;
                    
                }
            )
        }
        
        


       
     }
}
</script>
