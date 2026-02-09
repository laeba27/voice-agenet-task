import { motion } from 'framer-motion';
import { Mic, MicOff, Activity } from 'lucide-react';

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
                                backgroundColor: isListening ? '#00f3ff' : '#bc13fe'
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                                ease: "easeInOut"
                            }}
                            className="w-1 rounded-full bg-cyber-blue/50"
                        />
                    ))
                )}
                {state === 'idle' && (
                    <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
                        Tap Microphone to Start
                    </div>
                )}
                {isProcessing && (
                    <div className="flex items-center gap-2 text-cyber-blue/80 font-mono text-sm animate-pulse">
                        <Activity className="w-4 h-4" />
                        <span>PROCESSING VOICE INPUT...</span>
                    </div>
                )}
            </div>

            {/* Main Microphone Button */}
            <div className="relative group">
                {/* Glow Effects */}
                <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isListening ? 'bg-cyber-blue/60 scale-150' :
                        isProcessing ? 'bg-white/40 scale-125' :
                            isSpeaking ? 'bg-cyber-purple/60 scale-125' :
                                'bg-cyber-blue/0 scale-100 group-hover:bg-cyber-blue/30 group-hover:scale-110'
                    }`} />

                <motion.button
                    onClick={onStartListening}
                    disabled={state !== 'idle' && state !== 'speaking'} // Allow interrupting speaking? Maybe not for this simpler demo
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isListening ? 'bg-cyber-blue/20 border-cyber-blue text-cyber-blue shadow-[0_0_30px_rgba(0,243,255,0.4)]' :
                            isProcessing ? 'bg-white/10 border-white/50 text-white animate-spin-slow' :
                                isSpeaking ? 'bg-cyber-purple/20 border-cyber-purple text-cyber-purple' :
                                    'bg-black/40 border-white/10 text-white hover:border-cyber-blue/50 hover:text-cyber-blue'
                        }`}
                >
                    {isListening ? (
                        <Mic className="w-8 h-8 pointer-events-none" />
                    ) : isProcessing ? (
                        <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    ) : (
                        <Mic className="w-8 h-8 pointer-events-none" />
                    )}
                </motion.button>

                {/* Ripple Effect when Listening */}
                {isListening && (
                    <>
                        <motion.div
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border border-cyber-blue pointer-events-none"
                        />
                        <motion.div
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute inset-0 rounded-full border border-cyber-blue/50 pointer-events-none"
                        />
                    </>
                )}
            </div>

            <div className="mt-8 text-center space-y-1">
                <p className="text-xs text-gray-400 font-mono tracking-widest">
                    STATUS: <span className={
                        state === 'idle' ? 'text-gray-500' :
                            state === 'listening' ? 'text-cyber-blue animate-pulse' :
                                state === 'processing' ? 'text-white' :
                                    'text-cyber-purple'
                    }>{state.toUpperCase()}</span>
                </p>
            </div>
        </div>
    );
};

export default VoiceControls;
