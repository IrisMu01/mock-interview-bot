import React from "react";

export default function SubmissionTab() {
  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold">Generated Test Harness</label>
        <textarea
          className="w-full border p-2 rounded h-40 font-mono"
          defaultValue={`def solution():\n    ...`}
        />
      </div>
      <div>
        <label className="block font-semibold">Execution Output</label>
        <pre className="bg-gray-900 p-2 rounded text-sm">{`{}`}</pre>
      </div>
    </div>
  );
}
