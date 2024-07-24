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
            <h1>SumoIDE</h1>
            <Button variant="contained" color="primary" onClick={openFile}>Open File</Button>
            <Button variant="contained" color="secondary" onClick={saveFile}>Save File</Button>
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
