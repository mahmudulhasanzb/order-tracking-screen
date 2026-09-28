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
      ? `Hello Alex! I see order ${orderId} is currently delayed at the Chicago Intermodal Hub due to thunderstorm ground holds. I can expedite tracking or apply a courtesy credit.`
      : scenario === 'delivered_unreceived'
      ? `Hello Alex! I see order ${orderId} was marked delivered at 10:42 AM. If you haven't received it, I can launch an immediate trace or process an instant replacement.`
      : scenario === 'tracking_pending'
      ? `Hello Alex! Order ${orderId} is currently packing at our Secaucus Hub. Tracking numbers generate once the 4:30 PM carrier truck departs.`
      : `Hello Alex! I am your 24/7 dedicated delivery concierge for order ${orderId}. How can I assist your delivery today?`;

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
      let reply = "Thank you for reaching out! I've escalated this directly to our logistics supervisor on duty. We are tracking this order closely.";
      if (query.includes('delay') || query.includes('late')) {
        reply = "I understand the urgency! I've flagged order " + orderId + " for priority ground relay. You should receive our next milestone update shortly.";
      } else if (query.includes('where') || query.includes('track') || query.includes('status')) {
        reply = "The current GPS telemetry indicates the driver is on schedule in your local delivery radius. You can also view live pins on the main screen map.";
      } else if (query.includes('missing') || query.includes('delivered') || query.includes('receive')) {
        reply = "I am so sorry about that! I have registered an urgent missing parcel flag. Please also use the 'Report Package Not Received' button on screen to trigger an automatic replacement shipment.";
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
    }, 1200);
  };

  const faqs = [
    {
      q: 'Can I change my delivery address mid-transit?',
      a: 'Yes, if the package has not yet reached the local delivery depot. Contact courier dispatch or request an address hold via our agent chat.',
    },
    {
      q: 'What should I do if my package is delayed?',
      a: 'Delays caused by severe weather are actively rerouted. If delayed by more than 24 hours past the original estimate, you are eligible for an inconvenience voucher or priority reshipment.',
    },
    {
      q: 'What if tracking says delivered but I don’t have it?',
      a: 'Check secondary entryways, porches, and with neighbors. If unlocated after 30 minutes, submit a missing parcel report for an automatic replacement.',
    },
    {
      q: 'Can I pick up my parcel from the local hub?',
      a: 'Yes, you can request a "Hold for Pickup" at the nearest certified carrier location with valid government photo ID.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Order Support Concierge</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Order {orderId} • Priority Help</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Support Tabs */}
        <div className="grid grid-cols-3 border-b border-zinc-800 text-xs font-semibold bg-zinc-900/60">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'chat'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-800/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'call'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-800/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Carrier</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-800/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quick FAQs</span>
          </button>
        </div>

        {/* Tab 1: Live Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-[340px] max-h-[460px]">
            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-950/40">
              <div className="text-center my-1">
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                  Agent Connected • Swift Logistics Helpdesk
                </span>
              </div>

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'agent' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-zinc-800 border border-zinc-700/80 text-zinc-200 rounded-bl-none leading-relaxed'
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
                  <div className="bg-zinc-800 px-3 py-1.5 rounded-full text-[11px] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Agent is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompt Pills */}
            <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setInputText('Where is my package right now?')}
                className="text-[11px] font-medium whitespace-nowrap bg-zinc-800 hover:bg-zinc-750 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700 transition-colors"
              >
                Where is package?
              </button>
              <button
                onClick={() => setInputText('Can I reschedule delivery window?')}
                className="text-[11px] font-medium whitespace-nowrap bg-zinc-800 hover:bg-zinc-750 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700 transition-colors"
              >
                Reschedule delivery
              </button>
              <button
                onClick={() => setInputText('Need help with missing package')}
                className="text-[11px] font-medium whitespace-nowrap bg-zinc-800 hover:bg-zinc-750 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700 transition-colors"
              >
                Missing package
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to support..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
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

        {/* Tab 2: Call Carrier */}
        {activeTab === 'call' && (
          <div className="p-5 space-y-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Direct Carrier Support Line</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Speak directly with SwiftExpress local dispatch desk. Have order #{orderId} ready.
              </p>
              <div className="text-lg font-mono font-bold text-emerald-400 pt-1">
                +1 (800) 555-0199
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">Toll-free • Available 24/7</p>
            </div>

            <button
              onClick={() => {
                showToast('Initiating carrier phone call...', 'info');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md"
            >
              Call Carrier Now
            </button>
          </div>
        )}

        {/* Tab 3: FAQs */}
        {activeTab === 'faq' && (
          <div className="p-4 overflow-y-auto max-h-[400px] space-y-2.5">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs transition-colors open:border-zinc-700"
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
