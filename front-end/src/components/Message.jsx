import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Message({ msg }) {
  const isUser = msg.from_user;

  return (
    <div className={`space-y-1 text-left`}>
      <div className={`flex items-center text-sm text-gray-400 ${isUser ? 'flex-row-reverse' : ''}`}>
        {isUser ? (
          <>
            <span className="ml-1">You</span>
            <FontAwesomeIcon icon={faUser} />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faRobot} className="mr-1" />
            <span>Bot</span>
          </>
        )}
      </div>

      <div className={`p-3 rounded ${isUser ? 'bg-gray-800 self-end' : 'bg-gray-700 self-start'}`}>
        {msg.text === null ? (
          <FontAwesomeIcon icon={faSpinner} spin className="text-gray-300" />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
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
}
