import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/DashboardView.vue'
import Indexsiswa from '../components/siswa/IndexSiswa.vue'
import TambahSiswa from '../components/siswa/TambahSiswa.vue'
import EditSiswa from '../components/siswa/EditSiswa.vue';
import IndexBuku from '../components/buku/IndexBuku.vue';
import TambahBuku from '../components/buku/TambahBuku.vue'
import EditBuku from '../components/buku/EditBuku.vue'
import IndexTransaksi from '../components/transaksi/IndexTransaksi.vue'
import TambahTransaksi from '../components/transaksi/TambahTransaksi.vue'
import LoginVue from '../components/login/LoginVue.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/siswa',
    name: 'IndexSiswa',
    component: Indexsiswa
  },
  {
    path: '/siswa/tambahsiswa',
    name : 'TambahSiswa',
    component : TambahSiswa
},
{
  path : '/EditSiswa/:id',
  name : 'EditSiswa',
  component : EditSiswa
},
{
  path : '/buku',
  name : 'IndexBuku',
  component : IndexBuku
},
{
  path: '/buku/tambahbuku',
  name : 'TambahBuku',
  component : TambahBuku
},
{
  path: '/EditBuku/:id',
  name : 'EditBuku',
  component : EditBuku
},
{
  path : '/transaksi',
  name : 'IndexTransaksi',
  component : IndexTransaksi
},
{
  path: '/transaksi/tambahtransaksi',
  component : TambahTransaksi
},
{
  path : '/login',
  component : LoginVue
}


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
