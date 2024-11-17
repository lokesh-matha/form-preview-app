import React, { useState } from 'react';

interface JSONEditorProps {
  onJSONChange: (json: any) => void; // Callback function to send JSON changes to the parent
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onJSONChange }) => {
  const [jsonValue, setJsonValue] = useState<string>(''); // Raw JSON input
  const [error, setError] = useState<string | null>(null); // Error state for invalid JSON

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonValue(value);

    try {
      const parsedJSON = JSON.parse(value); // Try parsing the JSON
      setError(null); // Clear any error messages
      onJSONChange(parsedJSON); // Notify the parent with valid JSON
    } catch (err) {
      setError('Invalid JSON'); // Show an error message
      onJSONChange(null); // Notify the parent with invalid JSON
    }
  };

  return (
    <div>
      <textarea
        value={jsonValue}
        onChange={handleInputChange}
        className="w-full h-80 border rounded p-2"
        placeholder="Enter JSON here..."
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default JSONEditor;
