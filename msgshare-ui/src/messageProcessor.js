export function messageParser(snippetText) {
  const lines = snippetText.split("\n");
  const messages = [];
  let senders = new Set(); // To keep track of unique senders
  let currentSender = "Unknown"; // Use a default sender name

  lines.forEach((line) => {
    // Check for sender pattern at the beginning of the line
    const senderMatch = line.match(/^(\w[\w\s]*?):\s*/);

    if (senderMatch) {
      // Extract the sender's name and update the current sender
      const sender = senderMatch[1].trim();
      currentSender = sender;
      senders.add(sender); // Add sender to the set of unique senders

      // Check if there's message content following the sender's name
      const messageContent = line.substring(senderMatch[0].length).trim();
      if (messageContent) {
        // Add the message from the new sender
        messages.push({ sender: currentSender, content: messageContent });
      }
    } else {
      // If the line is not empty, treat it as a message from the current sender
      if (line.trim()) {
        messages.push({ sender: currentSender, content: line.trim() });
      }
    }
  });

  // Convert the Set of senders into an Array for easier handling
  senders = Array.from(senders);

  // Return both the messages and the senders
  return { messages, senders };
}
