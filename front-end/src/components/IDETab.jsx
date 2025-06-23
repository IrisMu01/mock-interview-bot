import React, {useState} from 'react';
import Editor from '@monaco-editor/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';

export default function IDETab() {
  const [code, setCode] = useState(`def solution():\n    pass`);
  const [testCases, setTestCases] = useState(`{
  "input": [1, 2, 3],
  "expected": 6
}`);

  const handleSubmit = () => {
    console.log('Code:', code);
    console.log('Test Cases:', testCases);
  };

  return (
    <div className="flex flex-col h-full space-y-2">
      {/* Code Editor (fills remaining space, but shrinks if needed) */}
      <div className="flex-1 min-h-0 border border-gray-700 p-2 rounded overflow-hidden">
        <div className="flex justify-between items-center pb-2">
          <label className="font-semibold">Solution (Python)</label>
        </div>
        <Editor
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={value => setCode(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Test Cases Panel (min height only) */}
      <div className="min-h-[200px] border border-gray-700 rounded p-2 bg-gray-900 flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <label className="font-semibold">Test Cases (Python dict)</label>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
          >
            <FontAwesomeIcon icon={faPlay} />
            <span>Submit</span>
          </button>
        </div>

        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={testCases}
          onChange={value => setTestCases(value)}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}
