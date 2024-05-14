export function decodedText(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    const decodedText = textarea.value;
    return decodedText.charAt(0).toUpperCase() + decodedText.slice(1);
  }