# JSON Form Editor and Preview

A React application that allows users to edit JSON schemas and preview the corresponding dynamic form. This tool is ideal for building and testing custom forms dynamically from JSON input.

## Features
- **JSON Editor**: Edit and validate JSON schema.
- **Form Preview**: Real-time form rendering based on the JSON schema.
- **Dark Mode**: Toggle between light and dark themes.
- **Clipboard Functionality**: Copy the JSON schema to the clipboard.
- **Dynamic Field Support**: Supports `text`, `email`, `textarea`, `radio`, `checkbox`, and `select` fields.

## Setup Instructions

### 1. Clone the Repository
Use the following command to clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>

2. Install Dependencies
Run the following command to install all the required dependencies:
npm install

3. Start the Development Server
Start the application locally using this command:
npm start
Open your browser and navigate to http://localhost:3000 to view the application.

4. Build for Production
To create an optimized production build, use this command:
npm run build
The production build will be available in the build/ directory.

Local Development Guide
File Structure:
src/components/JSONEditor.tsx: The JSON editor component.
src/components/FormPreview.tsx: The form preview component.
src/styles/: CSS styles for the application.
Adding a New Field Type:
Modify the FormPreview component to handle new field types. Ensure the JSON schema includes the correct type and associated attributes.

Testing:
Use the provided example JSON schemas to test the application.

Deployment Instructions:
Deploy on Vercel
Install the Vercel CLI globally:
npm install -g vercel
Deploy the project:
vercel
Follow the prompts to complete the deployment.

Deployed Application
You can view the live application here: https://form-preview-app.vercel.app/
