<template>
    <div class="snippet-page">
      <h1>Your Snippet URL</h1>
      <input ref="snippetUrl" :value="fullUrl" readonly>
      <button @click="copyUrl">Copy URL</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['slug'],
    computed: {
      fullUrl() {
        return `${window.location.origin}/s/${this.slug}`;
      }
    },
    methods: {
      copyUrl() {
        this.$refs.snippetUrl.select();
        document.execCommand('copy');
      }
    }
  };
  </script>
  
  <style src="../SnippetStyles.css"></style>
  