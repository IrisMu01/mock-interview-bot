import React from 'react';
import Editor from '@monaco-editor/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {submitCode} from '../store/submissionSlice';
import {setUserCode, setTestCases} from '../store/uiSlice';

export default function IDETab() {
  const dispatch = useDispatch();
  const code = useSelector(state => state.ui.user_code);
  const testCases = useSelector(state => state.ui.test_cases);
  const submitting = useSelector(state => state.submission.loading);

  const handleSubmit = () => {
    if (!submitting) {
      dispatch(submitCode({
        user_code: code,
        test_cases: testCases,
      }));
    }
  };

  return (
    <div className="flex flex-col h-full space-y-2">
      {/* Code Editor */}
      <div className="flex-1 min-h-0 border border-gray-700 p-2 rounded overflow-hidden">
        <div className="flex justify-between items-center pb-2">
          <label className="font-semibold">Solution (Python)</label>
        </div>
        <Editor
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={value => dispatch(setUserCode(value))}
          options={{
            fontSize: 14,
            minimap: {enabled: false},
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Test Cases Panel */}
      <div className="min-h-[200px] border border-gray-700 rounded p-2 bg-gray-900 flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <label className="font-semibold">Test Cases (List of Python dicts)</label>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm ${
              submitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <FontAwesomeIcon icon={faPlay}/>
            <span>Submit</span>
          </button>
        </div>

        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={testCases}
          onChange={value => dispatch(setTestCases(value))}
          options={{
            fontSize: 13,
            minimap: {enabled: false},
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}
