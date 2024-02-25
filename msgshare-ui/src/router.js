import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue"; // This should contain the "Create Snippet" form
import SnippetPage from "./components/SnippetPage.vue";
import NotFound from "./components/NotFoundPage.vue";
import { supabase } from "./infra/config";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  {
    path: "/:slug",
    name: "Snippet",
    component: SnippetPage,
    props: true,
    beforeEnter: async (to, from, next) => {
      const isValid = await validateSlug(to.params.slug);
      if (isValid) {
        next(); // Proceed to the route
      } else {
        next({ name: "NotFound" }); // Redirect to NotFound
      }
    },
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route
    name: "NotFound",
    component: NotFound,
  },
];

async function validateSlug(slug) {
  try {
    const { data, error } = await supabase
      .from("snippets")
      .select("id")
      .eq("slug", slug);
    if (error) throw error;
    return data.length > 0;
  } catch (error) {
    return false; // Assume invalid slug if there's an error
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
