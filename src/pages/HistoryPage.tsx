import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, Trash, MessageCircle, Mail, Clock, ChevronRight } from 'lucide-react';

interface HistoryItem {
  id: string;
  original: string;
  subject?: string;
  converted: string;
  tone: string;
  mode: string;
  timestamp: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('meowra_history') || '[]');
    setHistory(saved);
  }, []);

  const deleteItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('meowra_history', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Purge all your history?")) {
      setHistory([]);
      localStorage.removeItem('meowra_history');
    }
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Recent Transformations</h1>
          <p className="text-slate-500 font-medium">Your past kindness transformations, stored locally.</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-rose-100 text-rose-400 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-rose-50 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-rose-200">
          <Clock className="w-12 h-12 text-rose-200 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No history yet. Start converting!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item.id}
              className="bg-white border border-rose-50 rounded-[2rem] p-8 shadow-sm group hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${item.mode === 'Email' ? 'bg-blue-50 text-blue-400' : 'bg-rose-50 text-rose-400'}`}>
                    {item.mode === 'Email' ? <Mail className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 truncate max-w-[200px] sm:max-w-sm">
                      {item.subject || item.original.slice(0, 45) + '...'}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 underline decoration-rose-100 underline-offset-4 decoration-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">{item.tone}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-300">{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-slate-200 hover:text-red-400 transition-colors"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50/50 rounded-2xl text-xs text-slate-500 italic relative">
                  <div className="text-[8px] absolute top-2 right-4 font-bold uppercase tracking-widest text-slate-300">Original</div>
                  {item.original}
                </div>
                <div className="p-5 bg-rose-50/30 rounded-2xl text-xs text-slate-700 font-medium relative border border-rose-50/50">
                  <div className="text-[8px] absolute top-2 right-4 font-bold uppercase tracking-widest text-rose-300">Meowra</div>
                  {item.converted}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                 <button 
                  onClick={() => {
                    alert("Reuse feature coming soon!");
                  }}
                  className="text-[10px] font-bold uppercase tracking-widest text-rose-400 flex items-center gap-2 hover:gap-3 transition-all px-4 py-2 bg-rose-50/50 rounded-lg"
                >
                  Reuse Transformation <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
