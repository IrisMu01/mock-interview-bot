import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../store/chatSlice';

export default function StartModal({onClose}) {
  const [topic, setTopic] = useState('Arrays');
  const [difficulty, setDifficulty] = useState('Easy');
  const [time, setTime] = useState('20m');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    onClose();
    // TODO replace this
    // text: `${difficulty.toLowerCase()}, ${topic.toLowerCase()} (auto-generated question prompt)`
    dispatch(sendMessage({
      text: `easy, two-pointer (find range for a number in sorted array with duplicates)`
    }));
  };

  return (
    <div className="absolute inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded shadow-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Mock Interview Bot</h2>

        <div className="mb-4">
          <label className="block font-semibold">Topics</label>
          <select className="w-full p-2 border rounded" onChange={e => setTopic(e.target.value)}>
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

        <div className="mb-4">
          <label className="block font-semibold">Estimated Difficulty</label>
          <div className="flex gap-4">
            {['Easy', 'Medium', 'Hard'].map(level => (
              <label key={level}>
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={difficulty === level}
                  onChange={() => setDifficulty(level)}
                />{' '}
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Time Limit</label>
          <select className="w-full p-2 border rounded" value={time} onChange={e => setTime(e.target.value)}>
            <option>20m</option>
            <option>1h</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Begin
        </button>
      </div>
    </div>
  );
}
