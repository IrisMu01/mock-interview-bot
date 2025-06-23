import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Editor from '@monaco-editor/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronDown} from '@fortawesome/free-solid-svg-icons';

export default function SubmissionTab() {
  const submissions = useSelector(state => state.submission.list);
  const expandedIdFromUI = useSelector(state => state.ui.expandedSubmissionId);
  const [expandedId, setExpandedId] = useState(null);

  // keep in sync with UI state
  useEffect(() => {
    if (expandedIdFromUI != null) {
      setExpandedId(expandedIdFromUI);
    }
  }, [expandedIdFromUI]);

  return (
    <div className="space-y-4 overflow-y-auto p-2">
      {submissions.map((submission) => {
        const isOpen = expandedId === submission.id;

        const handleToggle = () =>
          setExpandedId(isOpen ? null : submission.id);

        const harnessCode = submission.generated_test_harness?.code || '';
        const outcome = submission.execution_result?.outcome || '';
        const output = submission.execution_result?.output || '';

        return (
          <div key={submission.id} className="border rounded border-gray-600">
            {/* Header */}
            <button
              onClick={handleToggle}
              className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 font-semibold flex items-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight}/>
              <span>Submission #{submission.id}</span>
            </button>


            {/* Details */}
            {isOpen && (
              <div className="space-y-4 p-4 bg-gray-900 text-gray-100">
                {/* Test Harness Section */}
                <div>
                  <h3 className="text-md font-semibold mb-1">Generated Test Harness</h3>
                  <Editor
                    height="300px"
                    defaultLanguage="python"
                    value={harnessCode}
                    options={{
                      readOnly: true,
                      fontSize: 14,
                      minimap: {enabled: false},
                      wordWrap: 'on',
                    }}
                    theme="vs-dark"
                  />
                </div>

                {/* Execution Output Section */}
                <div>
                  <h3 className="text-md font-semibold mb-1">Execution Result</h3>
                  <div
                    className={`mb-2 font-bold ${
                      outcome === 'OUTCOME_OK' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    Status: {outcome || 'N/A'}
                  </div>
                  <Editor
                    height="250px"
                    defaultLanguage="plaintext"
                    value={output}
                    options={{
                      readOnly: true,
                      fontSize: 13,
                      minimap: {enabled: false},
                      wordWrap: 'on',
                    }}
                    theme="vs-dark"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
