import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  Database,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Cpu,
  RefreshCw,
} from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSimulator: (params?: any) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sourceBadge?: string;
  hasSimulatorLink?: boolean;
}

export function AiAssistantDrawer({
  isOpen,
  onClose,
  onNavigateToSimulator,
}: AiAssistantDrawerProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello Mohammed. I am **DecisionTwin Intelligence**, connected to NovaTech Solutions' real-time ledger and Hindsight organizational memory.

I have verified your current business baseline:
• **Monthly Revenue:** ₹25,00,000 | **Operating Profit:** ₹6,00,000 (24.0% margin)
• **Headcount:** 35 employees with 76% billable utilization
• **Active Projects:** 12 engagements across 18 enterprise clients

What decision, assumption, or scenario would you like to evaluate before committing resources?`,
      timestamp: 'Just now',
      sourceBadge: 'Grounded in NovaTech Ledger & Memory',
    },
  ]);

  const quickPrompts = [
    'Should I increase the price of our monthly service package?',
    'What happened after our last hiring decision?',
    'Which projects are causing our margin to erode?',
    'Simulate adding 2 senior developers next quarter',
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      const assistantReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Decision analysis completed with verified organizational context.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceBadge: data.source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash • Real-time Reasoning' : 'Hindsight Verified Memory Engine',
        hasSimulatorLink: textToSend.toLowerCase().includes('hire') || textToSend.toLowerCase().includes('simulate') || textToSend.toLowerCase().includes('developer'),
      };
      setMessages((prev) => [...prev, assistantReply]);
    } catch (err) {
      const errorReply: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `**DecisionTwin Intelligence Note:**

Unable to reach cloud inference endpoint. Operating under local organizational memory rules:
- Current monthly revenue: ₹25,00,000
- Operating margin: 24.0%
- Key guideline: Preserve at least 60 days of cash reserves (₹38,00,000) before approving recurring payroll increases.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceBadge: 'Local Memory Fallback',
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">DecisionTwin Intelligence</span>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded border border-blue-400/30 font-mono">
                  Grounded AI
                </span>
              </div>
              <span className="text-[11px] text-slate-300">
                Connected to NovaTech Memory & Ledger
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Context Banner */}
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-[11px] flex items-center justify-between text-slate-600 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Rev: ₹25L • Margin: 24% • Util: 76%</span>
          </div>
          <span className="text-blue-600 font-semibold flex items-center gap-1">
            <Database className="w-3 h-3" />
            Hindsight Active
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed font-sans text-xs">
                  {msg.text}
                </div>

                {msg.hasSimulatorLink && (
                  <div className="pt-2 border-t border-slate-200 mt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToSimulator();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Open in Scenario Simulator
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div
                  className={`flex items-center justify-between pt-1 text-[10px] ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sourceBadge && (
                    <span className="font-mono text-[9px] bg-white/70 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">
                      {msg.sourceBadge}
                    </span>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-500 text-xs">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>Recalling organizational memory & evaluating financial model...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/60">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Suggested Decision Inquiries
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="shrink-0 text-[11px] bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 px-2.5 py-1 rounded-lg transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask DecisionTwin about pricing, hiring, risks..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold text-xs transition-colors flex items-center gap-1 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
            <span>Grounding: Hard Multi-Tenant Isolation</span>
            <span>Does not share private memory</span>
          </div>
        </div>
      </div>
    </div>
  );
}
