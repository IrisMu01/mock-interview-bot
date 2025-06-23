import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setActiveTab, setExpandedSubmissionId } from '../../store/uiSlice';

export default function UserMessage({ msg }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (msg.submissionId != null) {
      dispatch(setActiveTab(1)); // switch to Submission tab
      dispatch(setExpandedSubmissionId(msg.submissionId));
    }
  };

  return (
    <div className="space-y-1 text-left">
      <div className="flex flex-row-reverse items-center text-sm text-gray-400">
        <span className="ml-1">You</span>
        <FontAwesomeIcon icon={faUser} />
      </div>

      <div className="p-3 rounded bg-gray-800 self-end">
        {msg.submissionId != null ? (
          <button
            onClick={handleClick}
            className="text-blue-400 hover:underline font-mono cursor-pointer"
          >
            > Submission #{msg.submissionId}
          </button>
        ) : (
          <span>{msg.text}</span>
        )}
      </div>
    </div>
  );
}
