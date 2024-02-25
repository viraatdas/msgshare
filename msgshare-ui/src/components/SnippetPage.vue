<template>
  <div class="snippet-page">
    <!-- URL and Description Display Section -->
    <div class="url-copy-section">
      <h1>Your Snippet URL</h1>
      <div class="url-input-container">
        <input ref="snippetUrl" :value="fullUrl" readonly>
        <button @click="copyUrl">Copy URL</button>
      </div>
      <p class="snippet-description">{{ snippetDescription }}</p>
    </div>
    <!-- Messages Display Section -->
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
  props: ['slug'],
  data() {
    return {
      snippetContent: '',
      snippetDescription: '',
      messages: [],
      primarySender: '',
      showPreview: true,
    };
  },
  computed: {
    fullUrl() {
      return `${window.location.origin}/${this.slug}`;
    },
  },
  async mounted() {
    await this.fetchSnippet();
  },
  methods: {
    async fetchSnippet() {
      const { data, error } = await supabase
        .from('snippets')
        .select('content, description') // Fetch both content and description
        .eq('slug', this.slug)
        .single();

      if (error) {
        console.error('Error fetching snippet:', error);
        return;
      }

      // Set content and description from fetched data
      this.snippetContent = data.content;
      this.snippetDescription = data.description;

      // Process the content to display messages
      const result = messageParser(this.snippetContent);
      this.messages = result.messages;
      this.senders = result.senders;
      this.primarySender = this.senders.length ? this.senders[0] : '';
      this.showPreview = true; // Show preview only after processing
    },
    copyUrl() {
      this.$refs.snippetUrl.select();
      document.execCommand('copy');
    },
    messageClass(sender) {
      return this.primarySender === sender ? 'right' : 'left';
    },
  },
};
</script>

<style src="../SnippetStyles.css"></style>