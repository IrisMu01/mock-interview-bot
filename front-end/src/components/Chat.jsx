import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faRobot, faPaperPlane, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux';
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

  return (
    <div className="flex flex-col w-1/3 border-r border-gray-700 p-4 bg-gray-900 text-gray-100">
      <h1 className="text-xl font-bold mb-2">Mock Interview Bot</h1>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.map((msg, i) => {
          const isUser = msg.from_user;
          return (
            <div key={msg.id ?? i} className="space-y-1 text-left">
              <div className={`flex items-center text-sm text-gray-400 ${isUser ? 'flex-row-reverse' : ''}`}>
                {isUser ? (
                  <>
                    <span className="ml-1">You</span>
                    <FontAwesomeIcon icon={faUser}/>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faRobot} className="mr-1"/>
                    <span>Bot</span>
                  </>
                )}
              </div>

              <div
                className={`p-3 rounded ${
                  isUser ? 'bg-gray-800 self-end' : 'bg-gray-700 self-start'
                }`}
              >
                {msg.text === null ? (
                  <FontAwesomeIcon icon={faSpinner} spin className="text-gray-300"/>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match) {
                          return (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          );
                        }
                        return (
                          <code
                            className="bg-gray-800 text-green-300 px-1 py-0.5 rounded text-sm break-all whitespace-pre-wrap inline-block"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          );
        })}
        <div ref={scrollAnchorRef} />
      </div>

      {/* Prompt input box + Send button */}
      <div className="mt-4 flex flex-col gap-2">
        <textarea
          className="w-full p-3 border border-gray-600 rounded h-32 bg-gray-800 text-gray-100 resize-y"
          placeholder="Type your markdown message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="self-end flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          <span>Send</span>
          <FontAwesomeIcon icon={faPaperPlane}/>
        </button>
      </div>
    </div>
  );
}
