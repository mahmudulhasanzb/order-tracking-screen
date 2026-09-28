'use client';

import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Phone,
  HelpCircle,
  Send,
  User,
  Bot,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from './Toast';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  scenario: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export function SupportModal({ isOpen, onClose, orderId, scenario }: SupportModalProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'faq'>('chat');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const initialGreeting =
    scenario === 'delayed'
      ? `Hi Alex, order ${orderId} has a weather delay. How can I help you today?`
      : scenario === 'delivered_unreceived'
      ? `Hi Alex, I see order ${orderId} was marked delivered. If you cannot find it, I can assist right away.`
      : scenario === 'tracking_pending'
      ? `Hi Alex, order ${orderId} is being prepared. Tracking will update once scanned by the courier.`
      : `Hi Alex, how can I help with order ${orderId}?`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'agent',
      text: initialGreeting,
      time: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputText,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Thank you. I have notified our dispatch team for order ${orderId}.`;
      if (query.includes('delay') || query.includes('late')) {
        reply = `I have marked order ${orderId} for priority ground dispatch. You will receive an updated ETA shortly.`;
      } else if (query.includes('where') || query.includes('track') || query.includes('status')) {
        reply = `The courier is currently in your local area on scheduled route.`;
      } else if (query.includes('missing') || query.includes('delivered') || query.includes('receive')) {
        reply = `I have flagged this parcel for trace. Please also use 'Report Missing' on screen to initiate replacement.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'agent',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const faqs = [
    {
      q: 'Can I change my delivery address?',
      a: 'Address changes can be requested before the parcel reaches the local station. Reach out via chat to check eligibility.',
    },
    {
      q: 'What should I do if my package is delayed?',
      a: 'We monitor delays automatically. If delayed past 24 hours, you may reschedule delivery or request support.',
    },
    {
      q: 'What if tracking says delivered but I don’t have it?',
      a: 'Check surrounding drop spots and with neighbors. If still missing, submit a report for immediate assistance.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">Customer Support</h3>
              <p className="text-[10px] text-zinc-400 font-mono">Order {orderId}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 border-b border-zinc-800 text-xs font-medium bg-zinc-900/60">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'chat'
                ? 'border-emerald-500 text-emerald-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'call'
                ? 'border-emerald-500 text-emerald-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-emerald-500 text-emerald-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </button>
        </div>

        {/* Tab 1: Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-[320px] max-h-[420px]">
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-950/40 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'agent' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 border border-zinc-700/80 text-zinc-200'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`text-[9px] font-mono block mt-1 ${
                        m.sender === 'user' ? 'text-emerald-200 text-right' : 'text-zinc-500'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] text-zinc-500">Typing...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Call */}
        {activeTab === 'call' && (
          <div className="p-5 space-y-4 text-center">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <Phone className="w-6 h-6 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-semibold text-white">Carrier Support Hotline</h4>
              <div className="text-base font-mono font-bold text-emerald-400">
                +1 (800) 555-0199
              </div>
              <p className="text-[11px] text-zinc-500">Toll-free • Available 24/7</p>
            </div>

            <button
              onClick={() => showToast('Calling carrier dispatch...', 'info')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              Call Now
            </button>
          </div>
        )}

        {/* Tab 3: FAQ */}
        {activeTab === 'faq' && (
          <div className="p-4 overflow-y-auto max-h-[380px] space-y-2 text-xs">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 open:border-zinc-700"
              >
                <summary className="font-semibold text-zinc-200 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-zinc-400 mt-2 text-[11px] leading-relaxed pt-2 border-t border-zinc-850">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
