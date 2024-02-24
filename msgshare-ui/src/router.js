// router.js
import { createRouter, createWebHistory } from "vue-router";
import SnippetPage from "./components/SnippetPage.vue"; // Your component for displaying the snippet

const routes = [
  {
    path: "/:slug", // :slug is a dynamic segment that will be the unique ID
    name: "Snippet",
    component: SnippetPage,
    props: true,
  },
  // ... other routes ...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
