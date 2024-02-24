import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue"; // This should contain the "Create Snippet" form
import SnippetPage from "./components/SnippetPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/:slug", name: "Snippet", component: SnippetPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
