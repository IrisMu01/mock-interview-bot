import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../store/chatSlice';

export default function StartModal({onClose}) {
  const [topic, setTopic] = useState('Arrays');
  const [difficulty, setDifficulty] = useState('Easy');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    onClose();
    dispatch(sendMessage({
      text: `Topic: ${topic.toLowerCase()}, Difficulty: ${difficulty.toLowerCase()}`
    }));
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{backgroundColor: 'rgba(0, 0, 0, 0.85)'}}
    >
      <div className="bg-gray-700 text-white p-6 rounded shadow-xl w-full space-y-4 flex items-center justify-center">
        <div className="flex-column items-center justify-center w-full max-w-lg">
          <div>
            <h2 className="text-3xl font-bold text-center p-4">Mock Interview Bot</h2>
          </div>

          {/* Topics */}
          <div className="flex items-center gap-4 py-2">
            <label className="w-50 font-semibold text-right">Topic</label>
            <select
              className="flex-1 p-2 border rounded bg-gray-800 border-gray-600"
              onChange={e => setTopic(e.target.value)}
            >
              <option>Arrays</option>
              <option>Backtracking</option>
              <option>Binary Search</option>
              <option>Dynamic Programming</option>
              <option>Graphs</option>
              <option>Trees</option>
              <option>Two Pointers</option>
              <option>Sliding Window</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-4 py-2">
            <label className="w-50 font-semibold text-right">Difficulty</label>
            <select
              className="flex-1 p-2 border rounded bg-gray-800 border-gray-600"
              onChange={e => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="flex justify-center pt-4 py-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Begin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
