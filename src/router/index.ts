import AddRow from "@/views/AddRow.vue";
import CreateDatabase from "@/views/CreateDatabase.vue";
import CreateTable from "@/views/CreateTable.vue";
import DatabasesView from "@/views/DatabasesView.vue";
import DatabaseView from "@/views/DatabaseView.vue";
import MainLayout from "@/views/MainLayout.vue";
import TableView from "@/views/TableView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainLayout",
    redirect: "/databases",
    component: MainLayout,
    children: [
      {
        path: "/databases/edit",
        name: "CreateDatabase",
        component: CreateDatabase,
      },
      {
        path: "/databases",
        name: "DatabasesView",
        component: DatabasesView,
      },
      {
        path: "/databases/:db_name/edit",
        name: "CreateTable",
        component: CreateTable,
      },
      {
        path: "/databases/:db_name",
        name: "DatabaseView",
        component: DatabaseView,
      },
      {
        path: "/databases/:db_name/:table",
        name: "TableView",
        component: TableView,
      },
      {
        path: "/databases/:db_name/:table/edit/:id?",
        name: "AddRow",
        component: AddRow,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
