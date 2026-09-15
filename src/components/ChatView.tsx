import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, AllocationResult, Message } from '../types';
import { StorageService } from '../services/storage';
import { VerificationBadge } from './VerificationBadge';
import { SubstanceIndicator } from './SubstanceIndicator';
import {
  Send,
  ShieldCheck,
  Lock,
  Sparkles,
  Info,
  Calendar,
  Coffee,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ChatViewProps {
  currentUser: UserProfile | null;
  allocation: AllocationResult | null;
  onOpenAgreementGuide: () => void;
  onOpenRegisterModal?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  currentUser,
  allocation,
  onOpenAgreementGuide,
  onOpenRegisterModal
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const companion = allocation?.companion;

  useEffect(() => {
    if (allocation) {
      const loaded = StorageService.getMessages(allocation.id);
      setMessages(loaded);
    }
  }, [allocation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !allocation || !currentUser) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderAvatar: currentUser.avatarUrl,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = StorageService.addMessage(allocation.id, newMsg);
    setMessages(updated);
    setInputText('');

    // Reply when companion exists
    if (allocation.companion && messages.filter(m => m.senderId === currentUser.id).length === 0) {
      setTimeout(() => {
        if (!allocation.companion) return;
        const reply: Message = {
          id: `msg-reply-${Date.now()}`,
          senderId: allocation.companion.id,
          senderName: allocation.companion.fullName,
          senderAvatar: allocation.companion.avatarUrl,
          text: `Hi ${currentUser.fullName}! I received the allocation confirmation for Room ${allocation.room.roomNumber} too. Let's coordinate our move-in schedule and room setup here!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedWithReply = StorageService.addMessage(allocation.id, reply);
        setMessages(updatedWithReply);
      }, 1200);
    }
  };

  if (!currentUser || !allocation || !companion) {
    return (
      <div id="chat-no-allocation" className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-500">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          {!currentUser ? 'In-Platform Messaging Locked' : !allocation ? 'Allocation Required' : 'Companion Matching Queued'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {!currentUser
            ? 'Please register your student profile first to receive your room and Companion allocation.'
            : !allocation
            ? 'Submit or run your accommodation allocation to connect with your room and companion.'
            : `Room ${allocation.room.roomNumber} at ${allocation.property.name} is confirmed! The chat channel will activate as soon as a peer applicant is allocated as your Companion.`}
        </p>
        {onOpenRegisterModal && (
          <button
            onClick={onOpenRegisterModal}
            className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            {!currentUser ? 'Register Student Profile' : '+ Register Another Student Profile'}
          </button>
        )}
      </div>
    );
  }

  const promptSuggestions = [
    'Confirming my move-in arrival time',
    'Shall we share an iron & kettle?',
    'What are your thoughts on weekend study hours?',
    'Are you bringing extra bed linens?'
  ];

  return (
    <div id="chat-screen" className="max-w-4xl mx-auto space-y-4">
      {/* Companion Card Header in Chat */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={companion.avatarUrl}
            alt={companion.fullName}
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Your Companion
              </span>
              <h3 className="font-bold text-slate-900 text-sm">{companion.fullName}</h3>
              <VerificationBadge verification={companion.verification} size="sm" />
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>{companion.college}</span>
              <span>•</span>
              <span>{companion.course} ({companion.branch})</span>
              <span>•</span>
              <span>Mother Tongue: <strong>{companion.motherTongue}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SubstanceIndicator habit={companion.substanceHabit} size="sm" showDetails={false} />
          <button
            onClick={onOpenAgreementGuide}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Room Agreement Topics
          </button>
        </div>
      </div>

      {/* Controlled Privacy Notice */}
      <div
        id="privacy-shield-notice"
        className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex items-start gap-2.5"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-semibold">Controlled Privacy Protection Active: </span>
          In accordance with safety guidelines, personal phone numbers and private emails are permanently protected. Use this in-platform messenger for all room coordination.
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40">
          {messages.map(msg => {
            if (msg.isSystemNotice) {
              return (
                <div
                  key={msg.id}
                  className="p-3 rounded-lg bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-950 text-center max-w-xl mx-auto"
                >
                  <div className="font-semibold mb-0.5 text-indigo-900">{msg.senderName}</div>
                  <div className="text-slate-700">{msg.text}</div>
                </div>
              );
            }

            const isMe = msg.senderId === currentUser.id;

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={msg.senderAvatar || companion.avatarUrl}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover mb-1 border border-slate-200"
                  />
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                    isMe
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {!isMe && (
                    <div className="text-[10px] font-bold text-slate-500 mb-1">
                      {msg.senderName}
                    </div>
                  )}
                  <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                  <div
                    className={`text-[9px] text-right mt-1 ${
                      isMe ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Conversation Starters */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" /> Prompts:
          </span>
          {promptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 text-xs whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Message ${companion.fullName} safely on CampusNest...`}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
