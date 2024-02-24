<template>
    <div id="app" class="container">
      <div class="input-section">
        <h1>Create a Snippet</h1>
        <p>{{ description }}</p>
        <textarea v-model="snippetText" rows="10" cols="60"></textarea>
        <br>
        <button @click="processMessages">Preview Snippet</button>
        <button @click="createSnippet">Create Snippet</button>
      </div>
      <div class="output-section">
        <h2>Snippet Preview</h2>
        <div v-for="(message, index) in messages" :key="index" :class="['message', messageClass(message.sender)]">
          <div class="message-content">{{ message.content }}</div>
        </div>
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
        messages: [],
        senders: [], // Keep track of all unique senders
        primarySender: '', // Automatically determined primary sender
      };
    },
    methods: {
      processMessages() {
        if (this.snippetText.trim() === '') {
          alert('Please enter some text to create a snippet.');
          return;
        }
  
        const result = messageParser(this.snippetText);
        this.messages = result.messages;
        this.senders = result.senders;
        // Automatically determine the primary sender
        // This could be the first sender or any logic you define
        this.primarySender = this.senders.length ? this.senders[0] : '';
      },
      async createSnippet() {
        this.processMessages();
        if (!this.messages.length) {
          return; // Exit if no messages to process
        }
  
        const uniqueId = generateUniqueId();
        const { error } = await supabase
          .from('snippets')
          .insert([
            { slug: uniqueId, content: this.snippetText }
          ]);
  
        if (error) {
          console.error('Error saving snippet:', error);
        } else {
          this.$router.push({ name: 'Snippet', params: { slug: uniqueId } });
        }
      },
      messageClass(sender) {
        // Determines the CSS class based on the sender
        return this.primarySender === sender ? 'right' : 'left';
      },
    }
  };
  
  function generateUniqueId(length = 8) {
    return Math.random().toString(20).substr(2, length);
  }
  </script>
  
  
  
  <style src="../SnippetStyles.css"></style>
  