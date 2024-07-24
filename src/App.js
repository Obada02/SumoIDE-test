import React, { useState } from 'react';
import { Button } from '@mui/material';
import MonacoEditor from '@monaco-editor/react';

function App() {
  const [filePath, setFilePath] = useState('');
  const [fileContent, setFileContent] = useState('');

  const openFile = async () => {
    const { content, path } = await window.electron.openFile();
    setFileContent(content);
    setFilePath(path);
  };

  const saveFile = async () => {
    await window.electron.saveFile({ path: filePath, content: fileContent });
  };

  return (
    <div>
      <Button onClick={openFile}>Open File</Button>
      <Button onClick={saveFile}>Save File</Button>
      <MonacoEditor
        height="600"
        language="cpp"
        value={fileContent}
        onChange={(value) => setFileContent(value)}
      />
    </div>
  );
}

export default App;
