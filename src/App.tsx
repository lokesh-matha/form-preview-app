import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormPreview from './components/FormPreview';

import './styles/App.css';

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null);

  const handleJSONChange = (updatedJSON: any) => {
    setJsonData(updatedJSON);
  };

  return (
    <div className="app-container">
      <div className="split-screen">
        {/* Left side: JSON editor */}
        <div className="left-pane">
          <h1 className="text-xl font-semibold mb-4">JSON Editor</h1>
          <JSONEditor onJSONChange={handleJSONChange} /> {/* Correct prop name */}
        </div>

        {/* Right side: Form preview */}
        <div className="right-pane">
          <h1 className="text-xl font-semibold mb-4">Form Preview</h1>
          {jsonData ? <FormPreview schema={jsonData} /> : <p>Please load a schema to preview.</p>}
        </div>
      </div>
    </div>
  );
};


export default App;
