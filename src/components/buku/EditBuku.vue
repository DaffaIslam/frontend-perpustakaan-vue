<template>
    <div>
        <AppNavbar-component></AppNavbar-component>
        <AppSidebar-component></AppSidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Buku</h1>
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
                                    <h3 class="card-title">Edit Buku</h3>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="edit">
                                        <input type="hidden" v-model="id_buku">
                                        <label for="nama" class="form-label">judul_buku:</label>
                                        <input type="text" class="form-control" v-model="judul_buku" id="nama" autocomplete="off" placeholder="Ubah Nama Buku..">
                                        
                                       
                                        <label for="alamat" class="form-label">Pengarang:</label>
                                        <input type="text" v-model="pengarang" id="alamat" class="form-control" placeholder="Ubah Pengarang..">
                                        
                                        
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
                buku: [],
                    id_buku: "",
                    judul_buku: "",
                    pengarang: "",
                    
        }
   },
   mounted(){
    this.Getbuku(),
    this.getdetail(this.$route.params.id),
    this.Databuku()
   },
   
    
    methods : {
        Getbuku (){
            axios.get('http://localhost:8000/api/getbuku')
            .then(
                ({data}) => {
                    this.buku = data
                }
            );
        },
        
        getdetail(id_buku){
            axios.get('http://localhost:8000/api/anybuku/' + id_buku)
            .then((response) => {
                console.log(response.data[0])
                this.id_buku = response.data[0].id_buku
                this.judul_buku = response.data[0].judul_buku
                this.pengarang = response.data[0].pengarang
            })
       
    },

    edit: function(){
            let Databuku = {
                id_buku : this.id_buku,
                judul_buku : this.judul_buku,
                pengarang : this.pengarang,
                
            }
            axios.put("http://localhost:8000/api/updatebuku/" + this.id_buku , Databuku)
            .then(
              res => {
                swal({
                        title: "Sukses Update ",
                        icon: "success"
              })
                console.log(res)
                this.$router.push('/buku')
              }
               
            )
    }
 }
}
</script>
