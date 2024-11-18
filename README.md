JSON Form Editor and Preview
A React application that allows users to edit JSON schema and preview the corresponding dynamic form. This tool is ideal for building and testing custom forms dynamically from JSON input.

Features
JSON Editor: Edit and validate JSON schema.
Form Preview: Real-time form rendering based on the JSON schema.
Dark Mode: Toggle between light and dark themes.
Clipboard Functionality: Copy the JSON schema to the clipboard.
Dynamic Field Support: Supports text, email, textarea, radio, checkbox, and select fields.
Example JSON Schemas
Here’s a sample schema to get started:

json
Copy code
{
  "formTitle": "Customer Feedback Form",
  "formDescription": "We'd love to hear your thoughts on our product and service!",
  "fields": [
    {
      "id": "fullName",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "rating",
      "type": "radio",
      "label": "How would you rate our product?",
      "required": true,
      "options": [
        { "value": "1", "label": "1 - Poor" },
        { "value": "2", "label": "2 - Fair" },
        { "value": "3", "label": "3 - Good" },
        { "value": "4", "label": "4 - Very Good" },
        { "value": "5", "label": "5 - Excellent" }
      ]
    },
    {
      "id": "features",
      "type": "checkbox",
      "label": "Which features do you find most useful?",
      "required": false,
      "options": [
        { "value": "easeOfUse", "label": "Ease of Use" },
        { "value": "design", "label": "Design" },
        { "value": "performance", "label": "Performance" },
        { "value": "support", "label": "Customer Support" }
      ]
    },
    {
      "id": "satisfaction",
      "type": "select",
      "label": "Overall Satisfaction",
      "required": true,
      "options": [
        { "value": "verySatisfied", "label": "Very Satisfied" },
        { "value": "satisfied", "label": "Satisfied" },
        { "value": "neutral", "label": "Neutral" },
        { "value": "dissatisfied", "label": "Dissatisfied" },
        { "value": "veryDissatisfied", "label": "Very Dissatisfied" }
      ]
    },
    {
      "id": "suggestions",
      "type": "textarea",
      "label": "Any suggestions for improvement?",
      "required": false,
      "placeholder": "Let us know how we can improve"
    }
  ]
}
Setup Instructions
Follow these steps to set up the application locally:

Clone the Repository:

bash
Copy code
git clone <repository-url>
cd <repository-name>
Install Dependencies:

bash
Copy code
npm install
Start the Development Server:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000.

Build for Production:

bash
Copy code
npm run build
This command creates an optimized production build in the build/ directory.

Local Development Guide
File Structure:

src/components/JSONEditor.tsx: The JSON editor component.
src/components/FormPreview.tsx: The form preview component.
src/styles/: CSS styles for the application.
Adding a New Field Type: Modify the FormPreview component to handle new field types. Ensure the JSON schema includes the correct type and associated attributes.

Testing: Use the JSON schema provided above to test functionality.

Deployment Instructions
You can deploy the application on platforms like Vercel or Netlify.

Deploy on Vercel
Install the Vercel CLI:
bash
Copy code
npm install -g vercel
Deploy the project:
bash
Copy code
vercel
Follow the prompts to complete the deployment.
