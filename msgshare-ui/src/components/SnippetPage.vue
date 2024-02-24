<template>
  <div class="snippet-page">
    <!-- URL Display and Copy Section -->
    <div class="url-copy-section">
      <h1>Your Snippet URL</h1>
      <input ref="snippetUrl" :value="fullUrl" readonly>
      <button @click="copyUrl">Copy URL</button>
    </div>
  </div>
</template>


<script>
import { supabase } from '../infra/config'

export default {
  props: ['slug'],
  data() {
    return {
      snippetContent: '',
    };
  },
  computed: {
    fullUrl() {
      return `${window.location.origin}/${this.slug}`;
    },
  },
  async mounted() {
    console.log(this.slug);  
    await this.fetchSnippet();
  },
  methods: {
    async fetchSnippet() {
      const { data, error } = await supabase
        .from('snippets')
        .select('content')
        .eq('slug', this.slug)
        .single();

      if (error) {
        console.error('Error fetching snippet:', error);
        return;
      }

      this.snippetContent = data.content;
    },
    copyUrl() {
      this.$refs.snippetUrl.select();
      document.execCommand('copy');
    },
  },
};
</script>

<style scoped>
.url-copy-section {
  margin-bottom: 40px; /* Adds some space between the URL section and the content */
}

.snippet-content {
  padding: 20px;
  background-color: #f9f9f9; /* Light background for the content area */
  border-radius: 8px; /* Optional: adds rounded corners for the content box */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Optional: adds a subtle shadow for depth */
}

/* Styling for the input box to make it more visually integrated */
input[readonly] {
  cursor: pointer; /* Changes the cursor to indicate the field is clickable */
  background-color: #e9ecef; /* Light grey background */
  border: 1px solid #ced4da; /* Matching border */
  padding: 10px;
  border-radius: 4px;
}

button {
  margin-left: 10px; /* Adds spacing between the input field and the button */
  background-color: #007bff; /* Example button color */
  color: white; /* Text color */
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}
</style>
