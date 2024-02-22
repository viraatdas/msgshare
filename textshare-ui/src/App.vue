<template>
  <div id="app" class="container">
    <div class="input-section">
      <h1>Create a Snippet</h1>
      <p>{{ description }}</p>
      <textarea v-model="snippetText" rows="10" cols="60"></textarea>
      <br>
      <button @click="createSnippet">Create Snippet</button>
      <p v-if="snippetCreated">Snippet created! See preview on the right.</p>
    </div>
    <div class="output-section" v-if="snippetCreated">
      <h2>Snippet Preview</h2>
      <pre class="snippet-preview">{{ snippetText }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      description: 'Enter your snippet below:',
      snippetText: '',
      snippetCreated: false
    };
  },
  methods: {
    createSnippet() {
      // This is where you'd handle the snippet text
      this.snippetCreated = true;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
}

.input-section {
  width: 45%;
}

.output-section {
  width: 45%;
  border: 1px solid #ccc;
  padding: 20px;
  margin-left: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.snippet-preview {
  white-space: pre-wrap; /* Since <pre> is used, this will preserve new lines and spaces */
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

h2 {
  margin-top: 0;
}
</style>
