<template>
  <div id="app" class="container">
    <div class="input-section">
      <h1>Create a Snippet</h1>
      <p>{{ description }}</p>
      <textarea v-model="snippetText" rows="10" cols="60"></textarea>
      <br>
      <button @click="processMessages">Create Snippet</button>
    </div>
    <div class="output-section">
      <h2>Snippet Preview</h2>
      <div class="message" v-for="(message, index) in messages" :key="index" :class="{ 'left': message.sender !== 'Viraat Das', 'right': message.sender === 'Viraat Das' }">
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      description: 'Enter your chat transcript below:',
      snippetText: '',
      messages: []
    };
  },
  methods: {
    processMessages() {
      const lines = this.snippetText.split('\n');
      this.messages = [];
      let currentSender = '';
      let contentBuffer = '';

      lines.forEach(line => {
        if (line.includes(':')) {
          const splitLine = line.split(':');
          if (contentBuffer) {
            this.messages.push({ sender: currentSender, content: contentBuffer });
            contentBuffer = '';
          }
          currentSender = splitLine[0].trim();
          contentBuffer += splitLine[1].trim();
        } else {
          contentBuffer += '\n' + line.trim();
        }
      });

      if (contentBuffer) {
        this.messages.push({ sender: currentSender, content: contentBuffer });
      }
    }
  }
};
</script>


<style>
.container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.input-section {
  width: 45%;
}

.output-section {
  width: 45%;
}

/* iOS-like message bubble */
.snippet-preview {
  background-color: #efefef; /* iOS message background color */
  padding: 16px;
  border-radius: 20px; /* Rounded corners for bubble effect */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

/* If you want to add additional custom styles for syntax highlighting */
.hljs {
  background: transparent; /* Remove default background */
  padding: 0.5em; /* Padding inside the code block */
}

/* Override the colors as needed to match the iOS theme */
.hljs-comment { color: #999999; }
.hljs-keyword { color: #d73a49; }
.hljs-string { color: #032f62; }

/* Add more custom styles for other token types if needed */

/* You can add custom styles for buttons, textareas here as well */
textarea {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-family: sans-serif;
  margin-bottom: 10px;
}

button {
  background-color: #007aff; /* iOS button color */
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #005ecb;
}

button:active {
  background-color: #004ba0;
}


.message {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.message.right {
  justify-content: flex-end;
}

.message-content {
  background-color: #efefef;
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 60%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.message-content.left {
  background-color: #d1edf2; /* Different background color for the other sender */
}


/* ... add any other styles you need here ... */
</style>
