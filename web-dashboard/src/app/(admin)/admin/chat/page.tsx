'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Smile, 
  CheckCheck,
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function AdminChatPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [typedMessage, setTypedMessage] = useState('');

  // Data List Chat Admin (Mockup Premium)
  const chatList = [
    { id: 'chat-1', name: 'Budi Santoso', role: 'Owner Kost Melati', lastMsg: 'Baik pak, berkas perbaikan sertifikat tanah sudah...', time: '14:32', unread: 0, online: true, initials: 'BS', color: 'bg-blue-600' },
    { id: 'chat-2', name: 'Siti Rahma', role: 'Owner Apartemen Cozy', lastMsg: 'Apakah saldo payout saya bisa diproses hari ini?', time: '11:15', unread: 1, online: false, initials: 'SR', color: 'bg-emerald-600' },
    { id: 'chat-3', name: 'Ahmad Faisal', role: 'Penyewa Melati A-02', lastMsg: 'Bagaimana cara konfirmasi pembayaran lewat OVO?', time: 'Kemarin', unread: 0, online: true, initials: 'AF', color: 'bg-purple-600' }
  ];

  // Data Isi Percakapan untuk Chat Aktif (Budi Santoso)
  const [messages, setMessages] = useState([
    { id: 'm-1', sender: 'them', text: 'Halo selamat siang CS Kostify.', time: '14:15' },
    { id: 'm-2', sender: 'them', text: 'Saya mau menanyakan dokumen pengajuan verifikasi Kost Melati Indah yang kemarin ditolak karena sertifikat kurang jelas.', time: '14:16' },
    { id: 'm-3', sender: 'me', text: 'Halo selamat siang pak Budi. Betul sekali pak, untuk file Sertifikat Tanah kemarin terlihat buram saat kami periksa, mohon diunggah kembali berkas scan yang lebih jelas ya.', time: '14:20' },
    { id: 'm-4', sender: 'me', text: 'Anda bisa mengunggahnya langsung di form Edit Properti di dashboard Owner Anda.', time: '14:21' },
    { id: 'm-5', sender: 'them', text: 'Baik pak, berkas perbaikan sertifikat tanah sudah saya upload ulang ya. Terima kasih pak!', time: '14:30' }
  ]);

  const activeChat = chatList.find(c => c.id === activeChatId) || chatList[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg = {
      id: `m-${messages.length + 1}`,
      sender: 'me',
      text: typedMessage,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setTypedMessage('');
  };

  return (
    <div className={`h-[calc(100vh-140px)] flex rounded-2xl border overflow-hidden ${
      isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
    } ${transClass}`}>
      
      {/* COLUMN LEFT: CHAT LIST PANEL */}
      <div className={`w-80 shrink-0 border-r flex flex-col ${
        isDark ? 'border-neutral-900 bg-neutral-950/40' : 'border-neutral-100 bg-neutral-50/30'
      }`}>
        <div className="p-4 border-b dark:border-neutral-900">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text"
              placeholder="Cari obrolan bantuan..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500' 
                  : 'bg-white border-neutral-200 text-neutral-800 placeholder-neutral-400'
              }`}
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="flex-1 overflow-y-auto divide-y dark:divide-neutral-900/60">
          {chatList.map((chat) => {
            const isActive = chat.id === activeChatId;
            return (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors relative ${
                  isActive 
                    ? isDark ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-950'
                    : 'hover:bg-neutral-500/5'
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-full ${chat.color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                    {chat.initials}
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-950" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold truncate">{chat.name}</h4>
                    <span className="text-[9px] text-neutral-500">{chat.time}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-medium truncate mt-0.5">{chat.role}</p>
                  <p className={`text-xs mt-1 truncate ${
                    chat.unread > 0 
                      ? 'font-bold text-orange-500' 
                      : isDark ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {chat.lastMsg}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center absolute right-4 bottom-4">
                    {chat.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* COLUMN RIGHT: CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-neutral-900/10 dark:bg-neutral-950/20 relative">
        <div className={`h-16 px-6 border-b flex items-center justify-between z-10 shrink-0 ${
          isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-9 h-9 rounded-full ${activeChat.color} flex items-center justify-center text-white font-bold text-sm`}>
                {activeChat.initials}
              </div>
              {activeChat.online && (
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-neutral-950" />
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold leading-none">{activeChat.name}</h4>
              <span className="text-[9px] text-neutral-500 mt-1 block">
                {activeChat.role} • {activeChat.online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <button className={`p-2 rounded-xl border ${
            isDark ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 shadow-sm'
          }`}>
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Message history */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div 
                key={msg.id}
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    isMe 
                      ? 'bg-orange-600 text-white rounded-tr-none shadow-sm' 
                      : isDark
                        ? 'bg-neutral-900 text-neutral-200 rounded-tl-none border border-neutral-850'
                        : 'bg-white text-neutral-800 rounded-tl-none border border-neutral-200 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  
                  <div className="flex items-center gap-1 text-[9px] text-neutral-500 mt-0.5 px-1">
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-orange-400" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input message form */}
        <form 
          onSubmit={handleSendMessage}
          className={`p-4 border-t flex items-center gap-3 shrink-0 ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-100'
          }`}
        >
          <button type="button" className="p-2.5 rounded-xl hover:bg-neutral-500/10 text-neutral-500 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>

          <input 
            type="text"
            placeholder="Tulis balasan bantuan sistem Anda..."
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-orange-500' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 placeholder-neutral-400 focus:bg-white focus:border-orange-500'
            } ${transClass}`}
          />

          <button type="button" className="p-2.5 rounded-xl hover:bg-neutral-500/10 text-neutral-500 transition-colors">
            <Smile className="w-4 h-4" />
          </button>

          <button 
            type="submit" 
            className="p-2.5 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
