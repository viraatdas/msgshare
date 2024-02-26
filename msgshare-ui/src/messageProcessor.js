export function messageParser(snippetText) {
  const lines = snippetText.split("\n");
  const messages = [];
  let senders = new Set(); // To keep track of unique senders
  let currentSender = "Unknown"; // Default sender name, in case the first message doesn't specify a sender
  let contentBuffer = "";

  lines.forEach((line, index) => {
    // Improved detection of sender: using a regex to match patterns like "Name:" possibly followed by spaces or tabs
    const senderMatch = line.match(/^(\w[\w\s]*?):\s*/);

    if (senderMatch) {
      const sender = senderMatch[1];
      senders.add(sender); // Add sender to the set of unique senders

      // Push the previous message (if any) to the messages array before starting a new message
      if (contentBuffer) {
        messages.push({ sender: currentSender, content: contentBuffer.trim() });
        contentBuffer = "";
      }
      currentSender = sender;
      // Append the rest of the line (the message content) to the buffer
      contentBuffer += line.substring(senderMatch[0].length);
    } else {
      // Treat blank lines as paragraph breaks, indicating a new message from the same sender
      if (line.trim() === "" && contentBuffer.trim()) {
        messages.push({ sender: currentSender, content: contentBuffer.trim() });
        contentBuffer = "";
      } else {
        // For multiline messages or continuation after a sender, append with a line break for formatting
        if (contentBuffer) {
          contentBuffer += "\n" + line;
        } else {
          contentBuffer = line;
        }
      }
    }

    // At the end of the input, check if there's an unparsed message in the buffer
    if (index === lines.length - 1 && contentBuffer.trim()) {
      messages.push({ sender: currentSender, content: contentBuffer.trim() });
    }
  });

  // Convert Set to Array for easier handling
  senders = Array.from(senders);

  // Return both messages and senders
  return { messages, senders };
}
