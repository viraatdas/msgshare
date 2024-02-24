<template>
  <div id="app" class="container">
    <div class="input-section">
      <h1>Create a Snippet</h1>
      <p>{{ description }}</p>
      <textarea v-model="snippetText" rows="10" cols="60"></textarea>
      <br>
      <button @click="processMessages">Preview Snippet</button>
      <button @click="createSnippet" :disabled="!messages.length">Create Snippet</button>
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
import { processMessages } from './messageProcessor';

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
      const result = processMessages(this.snippetText);
      this.messages = result.messages;
      this.senders = result.senders;
      // Automatically determine the primary sender
      // This could be the first sender or any logic you define
      this.primarySender = this.senders.length ? this.senders[0] : '';
    },
    createSnippet() {
      console.log('Creating the snippet with messages:', this.messages);
      // Additional logic for creating the snippet
    },
    messageClass(sender) {
      // Determines the CSS class based on the sender
      return this.primarySender === sender ? 'right' : 'left';
    }
  }
};
</script>



<style src="./SnippetStyles.css"></style>
