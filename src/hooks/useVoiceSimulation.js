import { useState, useCallback } from 'react';

const CONVERSATION_STEPS = [
  {
    ai: "Hello! I'm your AI assistant. How can I help you today?",
    user: "Can you help me analyze my project timeline?"
  },
  {
    ai: "I'd be happy to help with that. Could you share the current project milestones?",
    user: "Sure, we have a beta launch in 2 weeks and full release in a month."
  },
  {
    ai: "Understood. With a beta in 2 weeks, we should prioritize critical bug fixes and stability testing immediately.",
    user: "That sounds right. What about the marketing campaign?"
  },
  {
    ai: "I recommend starting the teaser campaign now, ramping up to full promotion 1 week before the full release.",
    user: null // End of demo script
  }
];

export const useVoiceSimulation = () => {
  const [state, setState] = useState('idle'); // idle, listening, processing, speaking
  const [messages, setMessages] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const startListening = useCallback(() => {
    if (state !== 'idle' && state !== 'speaking') return;
    
    setState('listening');
    
    // Simulate listening duration
    setTimeout(() => {
      setState('processing');
      
      // Simulate processing duration
      setTimeout(() => {
        const currentStep = CONVERSATION_STEPS[stepIndex];
        
        if (currentStep) {
          // Add user message if it's not the first turn (initial greeting is AI only usually, but here AI starts)
          // Wait, let's adjust: user clicks mic to START interaction? 
          // Or user clicks mic to REPLY?
          // Let's assume User initiates or relies on the flow.
          
          // Logic: 
          // 1. User speaks (simulated) -> 'listening'
          // 2. Stop listening -> 'processing'
          // 3. AI speaks -> 'speaking'
          
          if (messages.length === 0) {
             // First interaction
             setState('speaking');
             simulateStreamingResponse(CONVERSATION_STEPS[0].ai);
             setStepIndex(0);
          } else {
             // Subsequent interactions
             const nextStep = CONVERSATION_STEPS[stepIndex];
             if (nextStep && nextStep.user) {
                // Add user message immediately after processing (as if recognized)
                addMessage('user', nextStep.user);
                
                // Then AI responds
                 setState('speaking');
                 // Simulate small cognitive delay before speaking
                 setTimeout(() => {
                    simulateStreamingResponse(nextStep.ai);
                    setStepIndex(prev => prev + 1);
                 }, 800);
             } else {
                // End of script
                setState('idle');
             }
          }
        }
      }, 1500 + Math.random() * 1000); // Random processing time
    }, 2000 + Math.random() * 1000); // Random listening time
  }, [state, stepIndex, messages]);

  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text, timestamp: new Date() }]);
  };

  const simulateStreamingResponse = (fullText) => {
    // For simplicity in this demo, we add the full message but could animate text appearance in UI.
    // To simulate "speaking" state duration, we wait based on text length.
    
    // Actually, let's just add the message and keep 'speaking' state for a while
    const speakingDuration = Math.max(2000, fullText.length * 50);
    
    addMessage('ai', fullText);
    
    setTimeout(() => {
      setState('idle');
    }, speakingDuration);
  };

  const resetConversation = () => {
    setMessages([]);
    setStepIndex(0);
    setState('idle');
  };

  return {
    state,
    messages,
    startListening,
    resetConversation
  };
};
