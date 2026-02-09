import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot } from 'lucide-react';

const ChatInterface = ({ messages, state }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide min-h-0">
            <AnimatePresence>
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`p-2 rounded-full ${msg.role === 'user' ? 'bg-cyber-purple/20 text-cyber-purple' : 'bg-cyber-blue/20 text-cyber-blue'}`}>
                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={`flex-1 max-w-[80%] rounded-2xl p-4 backdrop-blur-md ${msg.role === 'user'
                            ? 'bg-cyber-purple/10 border border-cyber-purple/20 text-right'
                            : 'bg-cyber-blue/10 border border-cyber-blue/20'
                            }`}>
                            <p className="text-sm md:text-base text-gray-100 leading-relaxed font-light">
                                {msg.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {state === 'speaking' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-cyber-blue text-xs font-mono ml-12"
                >
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span>AI is speaking...</span>
                </motion.div>
            )}
        </div>
    );
};

export default ChatInterface;
