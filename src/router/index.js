import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/components/Table'
import TableItemDetails from '@/components/TableItemDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table
    },
    {
      path: '/table-item-details/:id',
      name: 'TableItemDetails',
      component: TableItemDetails
    }
  ]
})
