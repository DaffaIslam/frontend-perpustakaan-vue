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
                                    <h3 class="card-title">Buku Baru</h3>
                                </div>
                                <form @submit.prevent="save">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Judul Buku</label>
                                            <input type="text" class="form-control" v-model="buku.judul_buku">
                                        </div>                                        
                                        <div class="form-group">
                                            <label>Pengarang</label>
                                            <input type="text" class="form-control" id="example-datepicker"  v-model="buku.pengarang">
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
            buku : {},
            buku1 : {},
            
        }
    },
    created() {   
        this.Databuku();
             
    },
    methods : { 
        Databuku(){
         
            axios.get("http://localhost:8000/api/getbuku")
            .then(
                ({data})=>{
                    this.buku1 = data }
            );
        },
        save(){
            this.save_data();
        },
        save_data(){
            axios.post('http://localhost:8000/api/createbuku', this.buku)
            .then(
                ({data}) => {
                    swal({
                        title: "Sukses tambah buku",
                        icon: "success"
                    })
                    this.$router.push('/buku');
                    this.siswa = data;
                }
            )
        },
    

        
    }
}
</script>
