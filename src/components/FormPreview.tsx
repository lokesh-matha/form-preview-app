import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../utils/clipboard';

// Define FormPreviewProps
interface Field {
  id: string; // Add id for input elements
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern: string;
    message: string;
  };
  options?: { value: string; label: string }[];
  accept?: string; // Accept property for file input types
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

  const [file, setFile] = useState<string | null>(null); // For storing image preview URL

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileURL = URL.createObjectURL(selectedFile); // Create a URL for the selected image
      setFile(fileURL); // Set the image preview URL
    }
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
  name={field.id} // Use field.id here
  required={field.required}
  className={`input-field ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 rounded p-2 w-full`}
>

    {/* Map through the options array */}
    {field.options.map((option) => {
      if (typeof option === 'string') {
        // Handle string array like ["India", "USA"]
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      } else if (typeof option === 'object' && option.value && option.label) {
        // Handle object array like [{ value: "india", label: "India" }]
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      }
      return null; // For invalid formats, skip rendering
    })}
  </select>
) : null}


              {/* Radio Button */}
              {field.type === 'radio' && field.options ? (
  <div className="radio-group">
    
    {field.options.map((option, index) => (
      <label
        key={`${field.id}-${index}`}
        htmlFor={`${field.id}-${index}`}
        className={`radio-label ${isDarkMode ? 'text-white' : 'text-black'} flex items-center gap-2`}
      >
        <input
          type="radio"
          id={`${field.id}-${index}`}
          name={field.id}
          value={typeof option === 'string' ? option : option.value}
          required={field.required}
          className="radio-input"
        />
        {typeof option === 'string' ? option : option.label}
      </label>
    ))}
  </div>
) : null}

              {/* File Input with Image Preview */}
              {field.type === 'file' && (
                <div className="file-upload">
                  <label
                    htmlFor={field.id}
                    className={`file-label ${isDarkMode ? 'text-white' : 'text-black'}`}
                  >
                    
                  </label>
                  <input
                    type="file"
                    id={field.id}
                    name={field.id}
                    accept={field.accept || 'image/*'}
                    className="file-input"
                    required={field.required}
                    onChange={handleFileChange}
                  />
                  {file && (
                    <div className="image-preview">
                      <img src={file} alt="Profile preview" className="profile-preview" />
                    </div>
                  )}
                </div>
              )}

              {/* Textarea */}
              {field.type === 'textarea' && (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`input-field ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 rounded p-2 w-full`}
                />
              )}

              {/* Password Input */}
              {field.type === 'password' && (
                <input
                  type="password"
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`input-field ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 rounded p-2 w-full`}
                />
              )}

              {/* Telephone Input with Validation */}
              {field.type === 'tel' && (
                <input
                  type="tel"
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  pattern={field.validation?.pattern}
                  title={field.validation?.message}
                  className={`input-field ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border border-gray-300 rounded p-2 w-full`}
                />
              )}

              {/* Render checkbox */}
              {field.type === 'checkbox' && field.options ? (
  <div className="checkbox-group">
    
    {field.options.map((option, index) => (
      <label
        key={`${field.id}-${index}`}
        htmlFor={`${field.id}-${index}`}
        className={`checkbox-label ${isDarkMode ? 'text-white' : 'text-black'} flex items-center gap-2`}
      >
        <input
          type="checkbox"
          id={`${field.id}-${index}`}
          name={`${field.id}-${option}`}
          value={typeof option === 'string' ? option : option.value}
          className="checkbox-input"
        />
        {typeof option === 'string' ? option : option.label}
      </label>
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
