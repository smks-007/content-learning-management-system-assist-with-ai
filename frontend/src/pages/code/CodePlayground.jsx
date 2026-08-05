import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { FiPlay, FiCpu, FiMessageSquare, FiCopy, FiCheck } from 'react-icons/fi';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ReactMarkdown from 'react-markdown';

const CodePlayground = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nfunction greet() {\n  console.log("Hello, World!");\n}\n\ngreet();');
  const [output, setOutput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('output');

  const handleRun = () => {
    setActiveTab('output');
    setOutput('Running code...\n> Hello, World!\n\nProgram exited with code 0.');
  };

  const handleAiAction = (action) => {
    setActiveTab('ai');
    setIsAiLoading(true);
    setAiResponse('');
    
    setTimeout(() => {
      setIsAiLoading(false);
      if (action === 'review') {
        setAiResponse('### Code Review\nYour code looks good! It\'s a standard function declaration.\n\n**Suggestions:**\n- Consider using arrow functions for simpler syntax: `const greet = () => console.log("Hello");`');
      } else if (action === 'explain') {
        setAiResponse('### Explanation\nThis code defines a function named `greet` that logs "Hello, World!" to the console. It then calls the function immediately.');
      }
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4">
      {/* Editor Section */}
      <Card className="flex-1 flex flex-col overflow-hidden border-gray-200 dark:border-white/10">
        <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 bg-gray-50 dark:bg-dark-900">
          <div className="flex items-center gap-2">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white dark:bg-dark-800 border border-gray-300 dark:border-white/10 rounded-md text-sm px-2 py-1 text-gray-700 dark:text-gray-200 outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleRun} icon={<FiPlay />}>Run</Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
              padding: { top: 16 },
              smoothScrolling: true,
            }}
          />
        </div>
      </Card>

      {/* Tools & Output Section */}
      <Card className="w-full lg:w-96 flex flex-col overflow-hidden border-gray-200 dark:border-white/10">
        <div className="flex border-b border-gray-200 dark:border-white/10">
          <button 
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'output' ? 'border-primary-500 text-primary-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('output')}
          >
            Output
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'border-accent-500 text-accent-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('ai')}
          >
            <FiCpu /> AI Assistant
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-950 p-4">
          {activeTab === 'output' ? (
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
              {output || 'Run your code to see the output here.'}
            </pre>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button size="sm" variant="secondary" onClick={() => handleAiAction('review')} icon={<FiCheck />}>Review Code</Button>
                <Button size="sm" variant="secondary" onClick={() => handleAiAction('explain')} icon={<FiMessageSquare />}>Explain</Button>
              </div>
              
              <div className="prose prose-sm dark:prose-invert">
                {isAiLoading ? (
                  <div className="flex items-center gap-2 text-primary-500">
                    <FiCpu className="animate-pulse" /> AI is analyzing...
                  </div>
                ) : aiResponse ? (
                  <ReactMarkdown>{aiResponse}</ReactMarkdown>
                ) : (
                  <p className="text-gray-500">Select an AI action above to analyze your code.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CodePlayground;
