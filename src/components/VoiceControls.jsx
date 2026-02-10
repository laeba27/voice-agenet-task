import { motion } from 'framer-motion';
import { Mic, Activity } from 'lucide-react';

const VoiceControls = ({ state, onStartListening }) => {
    const isListening = state === 'listening';
    const isProcessing = state === 'processing';
    const isSpeaking = state === 'speaking';

    return (
        <div className="relative flex flex-col items-center justify-center p-8 mt-auto">
            {/* Waveform Visualization (Simulated) */}
            <div className="h-16 flex items-center justify-center gap-1 mb-8 w-full max-w-xs">
                {(isListening || isSpeaking) && (
                    [...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: [10, Math.random() * 40 + 10, 10],
                                opacity: isListening ? 1 : 0.5
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                                ease: "easeInOut"
                            }}
                            className="w-1 rounded-full bg-white"
                        />
                    ))
                )}
                {state === 'idle' && (
                    <div className="text-gray-500 text-sm font-light tracking-widest uppercase">
                        Tap Microphone to Start
                    </div>
                )}
                {isProcessing && (
                    <div className="flex items-center gap-2 text-white/70 font-mono text-sm animate-pulse">
                        <Activity className="w-4 h-4" />
                        <span>PROCESSING...</span>
                    </div>
                )}
            </div>

            {/* Main Microphone Button */}
            <div className="relative group">
                {/* Glow Effects */}
                <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${isListening ? 'bg-white/20 scale-150' :
                    isProcessing ? 'bg-white/10 scale-125' :
                        isSpeaking ? 'bg-white/10 scale-125' :
                            'bg-transparent scale-100 group-hover:bg-white/5 group-hover:scale-110'
                    }`} />

                <motion.button
                    onClick={onStartListening}
                    disabled={state !== 'idle' && state !== 'speaking'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-500 ${isListening ? 'bg-white text-black border-transparent shadow-[0_0_40px_rgba(255,255,255,0.3)]' :
                        isProcessing ? 'bg-black/40 border-white/20 text-white/50' :
                            isSpeaking ? 'bg-white/10 border-white/20 text-white' :
                                'bg-black/40 border-white/10 text-white hover:border-white/30 hover:bg-white/5'
                        }`}
                >
                    {isProcessing ? (
                        <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    ) : (
                        <Mic className={`w-8 h-8 pointer-events-none transition-colors duration-300 ${isListening ? 'text-black' : 'text-current'}`} />
                    )}
                </motion.button>

                {/* Ripple Effect when Listening */}
                {isListening && (
                    <>
                        <motion.div
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
                        />
                        <motion.div
                            initial={{ scale: 1, opacity: 0.3 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"
                        />
                    </>
                )}
            </div>

            <div className="mt-8 text-center space-y-1">
                <p className="text-[10px] text-gray-600 font-mono tracking-[0.2em] uppercase">
                    Status: <span className={state === 'idle' ? 'text-gray-500' : 'text-white'}>
                        {state}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default VoiceControls;
