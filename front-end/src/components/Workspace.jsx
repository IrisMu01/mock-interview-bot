import React from "react";
import IDETab from "./IDETab";
import SubmissionTab from "./SubmissionTab";

export default function Workspace({ tabIndex, setTabIndex }) {
  return (
    <div className="flex-1 p-4 h-full flex flex-col bg-gray-900">
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${tabIndex === 0 ? "bg-blue-600" : "bg-gray-800"}`}
          onClick={() => setTabIndex(0)}
        >
          Solution
        </button>
        <button
          className={`px-4 py-2 rounded ${tabIndex === 1 ? "bg-blue-600" : "bg-gray-800"}`}
          onClick={() => setTabIndex(1)}
        >
          Submission
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {tabIndex === 0 ? <IDETab /> : <SubmissionTab />}
      </div>
    </div>
  );
}
