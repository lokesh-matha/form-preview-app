// src/utils/clipboard.ts
export const copyToClipboard = (text: string) => {
    return navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard successfully!');
      })
      .catch((err) => console.error('Failed to copy:', err));
  };
  