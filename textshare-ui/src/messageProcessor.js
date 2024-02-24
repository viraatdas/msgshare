// messageProcessor.js
export function processMessages(snippetText) {
  const lines = snippetText.split("\n");
  const messages = [];
  let senders = new Set(); // To keep track of unique senders
  let currentSender = "";
  let contentBuffer = "";

  lines.forEach((line) => {
    if (line.includes(":")) {
      const splitLine = line.split(":");
      const sender = splitLine[0].trim();
      senders.add(sender); // Add sender to the set of unique senders

      if (contentBuffer) {
        messages.push({ sender: currentSender, content: contentBuffer.trim() });
        contentBuffer = "";
      }
      currentSender = sender;
      contentBuffer += splitLine.slice(1).join(":").trim();
    } else {
      contentBuffer += "\n" + line.trim();
    }
  });

  if (contentBuffer) {
    messages.push({ sender: currentSender, content: contentBuffer.trim() });
  }

  // Determine primary and secondary senders based on the order of appearance
  senders = Array.from(senders); // Convert Set to Array for easier handling
  return { messages, senders }; // Return both messages and senders
}
