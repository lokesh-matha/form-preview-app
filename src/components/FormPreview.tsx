import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../utils/clipboard'; // Assuming you have this utility for clipboard functionality

// Define FormPreviewProps
interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern: string;
    message: string;
  };
  options?: { value: string; label: string }[];
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

interface FormPreviewProps {
  schema: FormSchema;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Define isSubmitted state

  // Toggle dark mode based on user preference or system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  // Handle Copy to Clipboard
  const handleCopy = () => {
    const jsonData = JSON.stringify(schema, null, 2); // Format the JSON nicely
    copyToClipboard(jsonData);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset the button text after 2 seconds
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setIsSubmitted(true); // Set submission status to true
    setTimeout(() => setIsSubmitted(false), 3000); // Hide the success message after 3 seconds
  };

  return (
    <div
      className={`form-preview-container ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={handleDarkModeToggle}
        className={`toggle-dark-mode ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} text-lg p-2 rounded mb-4`}
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      {/* Copy JSON Button */}
      <button
        onClick={handleCopy}
        className={`copy-json-button ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white py-2 px-4 rounded`}
      >
        {isCopied ? 'Copied!' : 'Copy Form JSON'}
      </button>

      {/* Form Preview */}
      <h2 className="form-title text-2xl font-semibold mb-4">{schema.formTitle}</h2>
      <p className="form-description mb-6">{schema.formDescription}</p>

      {/* Display Success Message After Submit */}
      {isSubmitted && (
        <p className="text-green-600 font-semibold mb-4">Submitted Successfully!</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Validate fields */}
        {schema.fields && schema.fields.length > 0 ? (
          schema.fields.map((field) => (
            <div key={field.id} className="form-field mb-4">
              <label htmlFor={field.id} className="block font-medium text-lg">
                {field.label}
              </label>
              {/* Render Input Fields Based on Type */}
              {field.type === 'text' || field.type === 'email' ? (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`input-field ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 rounded p-2 w-full`}
                />
              ) : null}

              {field.type === 'select' && field.options ? (
                <select
                  id={field.id}
                  required={field.required}
                  className={`input-field ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 rounded p-2 w-full`}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : null}

              {field.type === 'radio' && field.options ? (
                <div className="radio-group">
                  {field.options.map((option) => (
                    <label
                      key={option.value}
                      className={`radio-label ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      <input type="radio" id={field.id} name={field.id} value={option.value} />
                      {option.label}
                    </label>
                  ))}
                </div>
              ) : null}

              {/* Only render textarea when type is 'textarea' */}
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`input-field ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 rounded p-2 w-full`}
                />
              ) : null}

              {/* Render checkbox */}
              {field.type === 'checkbox' && field.options ? (
  <div className="checkbox-group mb-4">
    {/* Render the label for the checkbox field only once */}    
    {/* Map through the options and render individual checkboxes */}
    {field.options.map((option) => (
      <div key={option.value} className="flex items-center mb-2">
        <input
          type="checkbox"
          id={option.value}
          name={field.id}  // Ensure checkboxes share the same name for grouping
          value={option.value}
          className={`checkbox-input ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border border-gray-300 p-2`}
        />
        <label htmlFor={option.value} className={`ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {option.label}
        </label>
      </div>
    ))}
  </div>
) : null}





            </div>
          ))
        ) : (
          <p>No fields available to display.</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`submit-button ${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white py-2 px-4 rounded`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
