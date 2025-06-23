import React, {useState, useRef, useEffect} from 'react';
import Message from "./message/Message.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import {setConfirmingEnd, setConcluded} from '../store/uiSlice';
import {sendMessage} from '../store/chatSlice';


export default function Chat() {
  // Handle user inputs
  const messages = useSelector(state => state.chat.data);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage({text: input.trim()}));
      setInput('');
    }
  };

  // Scroll to bottom of chatbox on new bot/user messages
  const scrollAnchorRef = useRef(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  // Handle conclude interview
  const confirmingEnd = useSelector(state => state.ui.confirmingEnd);
  const concluded = useSelector(state => state.ui.concluded);

  const handleEndClick = () => {
    if (!confirmingEnd) {
      dispatch(setConfirmingEnd(true));
    } else {
      dispatch(sendMessage({text: "I'd like to conclude this mock interview. Transfer to agent 'Evaluator'"}));
      dispatch(setConcluded(true));
    }
  };

  return (
    <div className="flex flex-col w-1/3 border-r border-gray-700 p-4 bg-gray-900 text-gray-100">
      <h1 className="text-xl font-bold mb-2">Mock Interview Bot</h1>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.map((msg, i) => (
          <Message key={msg.id ?? i} msg={msg}/>
        ))}
        <div ref={scrollAnchorRef}/>
      </div>

      {/* Prompt input box + Send button */}
      <div className="mt-4 flex flex-col gap-2">
        <textarea
          disabled={concluded}
          className="w-full p-3 border border-gray-600 rounded h-32 bg-gray-800 text-gray-100 resize-y"
          placeholder="Type your markdown message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="flex flex-row-reverse">
          <button
            disabled={concluded}
            onClick={handleSend}
            className={`self-end flex items-center gap-1 text-white text-sm px-3 py-1 rounded 
            ${concluded ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}
            `}
          >
            <span>Respond</span>
            <FontAwesomeIcon icon={faChevronRight}/>
          </button>
          <button
            disabled={concluded}
            onClick={handleEndClick}
            className={`rounded text-white text-sm px-3 py-1 mx-2 
            ${confirmingEnd ? 'bg-green-600' : ('bg-gray-600')} 
            ${concluded ? 'bg-gray-600 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {confirmingEnd ? 'Confirm end interview' : 'End Interview'}
          </button>
        </div>
      </div>
    </div>
  );
}
