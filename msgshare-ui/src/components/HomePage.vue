<template>
    <div id="app" class="container">
      <div class="input-section">
        <h1>Paste your text conversations</h1>
        <input v-model="snippetDescription" placeholder="Enter a description..." class="description-input" />
        <textarea v-model="snippetText" rows="10" cols="60" class="snippet-textarea"></textarea>
        <div class="button-container">
          <button @click="previewSnippet">Preview Snippet</button>
          <button @click="createSnippet">Create Snippet</button>
        </div>
      </div>
      <div class="output-section">
        <!-- Wrapper element for the v-if condition -->
        <template v-if="showPreview">
          <div v-for="(message, index) in messages" :key="index" :class="['message', messageClass(message.sender)]">
            <div class="message-content">{{ message.content }}</div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  
  <script>
  import { messageParser } from '../messageProcessor';
  import { supabase } from '../infra/config';
  
  export default {
    name: 'App',
    data() {
      return {
        description: 'Enter your chat transcript below:',
        snippetText: '',
        snippetDescription: '',
        messages: [],
        senders: [],
        primarySender: '',
        showPreview: false, 
      };
    },
    methods: {
      previewSnippet() {
        if (!this.validateInput()) {
          return;
        }
        const result = messageParser(this.snippetText);
        this.messages = result.messages;
        this.senders = result.senders;
        this.primarySender = this.senders.length ? this.senders[0] : '';
        this.showPreview = true; // Show preview only after processing
      },
      async createSnippet() {
        if (!this.validateInput()) {
          return;
        }
        const uniqueId = generateUniqueId();
        const { error } = await supabase
          .from('snippets')
          .insert([{ slug: uniqueId, content: this.snippetText, description: this.snippetDescription }]);
        if (error) {
          console.error('Error saving snippet:', error);
        } else {
          this.showPreview = false; // Reset preview visibility
          this.$router.push({ name: 'Snippet', params: { slug: uniqueId } });
        }
      },
      validateInput() {
        if (this.snippetText.trim() === '' || this.snippetDescription.trim() === '') {
          alert('Please enter both a description and some text for the snippet.');
          return false;
        }
        return true;
      },
      messageClass(sender) {
        return this.primarySender === sender ? 'right' : 'left';
      },
    },
  };
  function generateUniqueId(length = 8) {
    return Math.random().toString(20).substr(2, length);
  }
  </script>
  
  
  <style src="../SnippetStyles.css"></style>
  