import React from 'react';
import GlassCard from './components/GlassCard';
import ChatInterface from './components/ChatInterface';
import VoiceControls from './components/VoiceControls';
import { useVoiceSimulation } from './hooks/useVoiceSimulation';
import { Sparkles } from 'lucide-react';

function App() {
  const { state, messages, startListening, resetConversation } = useVoiceSimulation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#050511] relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[128px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <GlassCard className="w-full max-w-md md:max-w-lg h-[85vh] max-h-[800px] flex flex-col relative z-10 transition-all duration-700 ease-out border-opacity-30 border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-cyber-blue" />
              <div className="absolute inset-0 bg-cyber-blue blur-sm opacity-50" />
            </div>
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              VOICE AI
            </h1>
          </div>
          <button
            onClick={resetConversation}
            className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            Reset
          </button>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Main Interface Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden min-h-0">
          {messages.length === 0 && state === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-gray-400 opacity-60 pointer-events-none">
              <p className="font-light">Tap the microphone to start a conversation with the future.</p>
            </div>
          )}

          <ChatInterface messages={messages} state={state} />

          <VoiceControls state={state} onStartListening={startListening} />
        </div>
      </GlassCard>

      {/* Build Status / Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-600 font-mono">
        SYSTEM STATUS: ONLINE | V.2.0.4
      </div>
    </div>
  );
}

export default App;
