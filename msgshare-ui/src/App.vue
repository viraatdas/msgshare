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
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://jgiumbeaxukxlccwpwbf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaXVtYmVheHVreGxjY3dwd2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1ODMxOTcsImV4cCI6MjAyNDE1OTE5N30.oS__y-4aBPliuqiGF8VvkMvgewueVBDDA7wT29Ef4T0';
const supabase = createClient(supabaseUrl, supabaseKey);

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
    async createSnippet() {
      console.log('Creating the snippet with messages:', this.messages);
      const uniqueId = generateUniqueId();
      const { data, error } = await supabase
        .from('snippets')
        .insert([
          { slug: uniqueId, content: this.snippetText }
        ]);

      if (error) {
        console.error('Error saving snippet:', error);
      } else {
        console.log('Snippet saved successfully. URL ID:', uniqueId, data);
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



<style src="./SnippetStyles.css"></style>
