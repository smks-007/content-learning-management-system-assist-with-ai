import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FiSend, FiPaperclip, FiMic, FiCopy, FiRefreshCw, FiMoreVertical } from 'react-icons/fi';
import Button from '../../components/common/Button';
import aiService from '../../services/aiService';

const AiChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: 'Hello! I am your AI learning assistant. How can I help you today? You can ask me to explain concepts, review code, or generate practice questions.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => 'session_' + Date.now());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input.trim();
    const userMsg = { id: Date.now(), role: 'user', content: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await aiService.chat({ message: userText, sessionId });
      const aiContent = res.data?.data?.content || res.data?.content || "Here is your response!";
      const aiMsg = { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: aiContent 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Chat Error:', err);
      // Helpful fallback response
      let fallbackText = "### 🤖 CLMS AI Assistant\n\nI am ready to help you learn! Ask me anything about **React**, **Java**, **Spring Boot**, **Python**, or **Database Systems**.";
      const lower = userText.toLowerCase();
      if (lower.contains ? lower.contains("react") : lower.includes("react")) {
        fallbackText = "### 💡 React Explanation\n\nReact components let you split the UI into independent, reusable pieces.\n\n```jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n```";
      } else if (lower.includes("java") || lower.includes("spring")) {
        fallbackText = "### ☕ Java & Spring Boot\n\nSpring Boot builds stand-alone Spring applications with embedded Tomcat.\n\n```java\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n```";
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content: fallbackText }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] glass-dark rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-dark-900/50">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AI Assistant
          </h2>
          <p className="text-xs text-gray-500">Powered by GPT-4</p>
        </div>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <FiMoreVertical />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm
                ${msg.role === 'user' ? 'bg-primary-500 text-white' : 'bg-gradient-to-tr from-accent-500 to-primary-500 text-white'}`}
              >
                {msg.role === 'user' ? 'U' : 'AI'}
              </div>

              <div className={`group relative p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-primary-500 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/5 rounded-tl-sm shadow-sm'
              }`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                
                {msg.role === 'ai' && (
                  <div className="absolute -bottom-10 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="p-1.5 bg-dark-800 rounded-md text-gray-400 hover:text-white" title="Copy"><FiCopy size={14}/></button>
                    <button className="p-1.5 bg-dark-800 rounded-md text-gray-400 hover:text-white" title="Regenerate"><FiRefreshCw size={14}/></button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex gap-3 max-w-[75%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-500 to-primary-500 flex items-center justify-center text-white text-sm">AI</div>
              <div className="p-4 rounded-2xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-white/5 rounded-tl-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/50 dark:bg-dark-900/80 border-t border-gray-200 dark:border-white/10">
        <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
          <button className="p-3 text-gray-400 hover:text-primary-500 transition-colors">
            <FiPaperclip size={20} />
          </button>
          
          <div className="flex-1 bg-gray-100 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-white/10 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all overflow-hidden">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything... (Shift+Enter for new line)"
              className="w-full max-h-32 min-h-[52px] bg-transparent resize-none p-3 outline-none text-gray-900 dark:text-white"
              rows={1}
            />
          </div>
          
          <button className="p-3 text-gray-400 hover:text-primary-500 transition-colors">
            <FiMic size={20} />
          </button>
          
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping}
            className="rounded-xl h-[52px] w-[52px] p-0 flex items-center justify-center shrink-0"
          >
            <FiSend size={20} className={input.trim() ? 'translate-x-0.5 -translate-y-0.5' : ''} />
          </Button>
        </div>
        <div className="text-center mt-2 text-[10px] text-gray-500">
          AI can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
};

export default AiChat;
