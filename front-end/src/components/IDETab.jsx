import React from "react";

export default function IDETab() {
  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold">Code</label>
        <textarea
          className="w-full border p-2 rounded h-40 font-mono"
          defaultValue={`def solution(input):\n    ...`}
        />
      </div>
      <div>
        <label className="block font-semibold">Test Cases (JSON)</label>
        <textarea
          className="w-full border p-2 rounded h-40 font-mono"
          placeholder={`{
  "input": [1, 2, 3],
  "expected": 6
}`}
        />
      </div>
    </div>
  );
}
