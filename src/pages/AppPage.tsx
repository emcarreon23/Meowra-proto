import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Copy, 
  Trash2, 
  Sparkles, 
  CheckCircle, 
  Mail, 
  MessageCircle,
  Hash,
  Cat
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Tone = 'Friendly' | 'Professional' | 'Apologetic' | 'Gentle';
type Mode = 'Text' | 'Email';

interface HistoryItem {
  id: string;
  original: string;
  subject?: string;
  converted: string;
  tone: Tone;
  mode: Mode;
  timestamp: number;
}

export default function AppPage() {
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('');
  const [output, setOutput] = useState('');
  const [tone, setTone] = useState<Tone>('Friendly');
  const [mode, setMode] = useState<Mode>('Text');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const charCount = input.length;

  const handleConvert = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const prompt = `
        You are MEOWRA, a kind-hearted AI companion. 
        Your goal is to rewrite the following message to be ${tone.toLowerCase()} and kinder, while preserving the original intent completely.
        
        Original Mode: ${mode}
        Target Tone: ${tone}
        
        Original Message:
        ${mode === 'Email' ? `Subject: ${subject}\n\n` : ''}${input}
        
        Re-write it beautifully. If it's an email, provide both a subject line (if applicable) and the body.
        Format the output clearly.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const convertedText = response.text || "I couldn't find a kinder way to say that... could you try rephrasing for me?";
      setOutput(convertedText);

      // Save to history
      const historyItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        original: input,
        subject: mode === 'Email' ? subject : undefined,
        converted: convertedText,
        tone,
        mode,
        timestamp: Date.now()
      };
      
      const savedHistory = JSON.parse(localStorage.getItem('meowra_history') || '[]');
      localStorage.setItem('meowra_history', JSON.stringify([historyItem, ...savedHistory].slice(0, 20)));

    } catch (error) {
      console.error("Conversion failed:", error);
      setOutput("Oops! My whiskers got tangled. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setSubject('');
    setOutput('');
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto flex flex-col gap-8">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Turn blunt into <span className="text-rose-400 italic font-serif">beautiful</span></h1>
        <p className="text-slate-500">Softening your words without losing your meaning.</p>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-50 p-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 p-1 bg-slate-50 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setMode('Text')}
            className={`flex-1 md:flex-initial px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'Text' ? 'bg-white shadow-sm text-rose-500' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Text Mode
          </button>
          <button
            onClick={() => setMode('Email')}
            className={`flex-1 md:flex-initial px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'Email' ? 'bg-white shadow-sm text-rose-500' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Email Mode
          </button>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">Tone Selector:</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            className="flex-1 md:flex-initial bg-rose-50 text-rose-600 text-sm font-semibold py-2.5 px-4 rounded-xl border-none outline-none cursor-pointer focus:ring-2 focus:ring-rose-200 transition-all"
          >
            <option value="Friendly">Friendly & Warm</option>
            <option value="Professional">Professional</option>
            <option value="Apologetic">Apologetic</option>
            <option value="Gentle">Gentle Reminder</option>
          </select>
          <button
            onClick={handleClear}
            className="p-2.5 text-slate-300 hover:text-red-400 transition-colors"
            title="Clear All"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Side: Input */}
        <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-6 flex flex-col gap-4 min-h-[400px]">
          {mode === 'Email' && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Type original subject..."
                className="w-full px-0 py-2 border-b border-rose-50 focus:border-rose-200 focus:outline-none text-slate-700 font-medium transition-colors"
              />
            </div>
          )}
          
          <div className="flex-1 flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Original Message</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your blunt or harsh message here..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 resize-none leading-relaxed placeholder:text-slate-300 min-h-[220px]"
            />
            <div className="flex justify-between items-center mt-4 border-t pt-4 border-rose-50">
              <span className="text-[10px] text-slate-300 font-mono tracking-widest">{charCount} / 1000 characters</span>
              <button
                onClick={handleConvert}
                disabled={isLoading || !input.trim()}
                className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  isLoading || !input.trim() 
                  ? 'bg-slate-50 text-slate-300 cursor-not-allowed' 
                  : 'bg-rose-400 text-white shadow-lg shadow-rose-200/50 hover:bg-rose-500'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Converting...
                  </div>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Meowra!
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Output */}
        <div className="bg-rose-50/40 rounded-3xl border-2 border-dashed border-rose-200 p-8 flex flex-col relative min-h-[400px]">
          <label className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-4 block">MEOWRA's Kind Version</label>
          <div className="flex-1 relative overflow-y-auto">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-dashed border-rose-200 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-rose-300" />
                  </motion.div>
                  <p className="text-rose-400 font-medium italic text-sm">Whisking kindness...</p>
                </motion.div>
              ) : output ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 h-full flex flex-col"
                >
                  <div className="flex-1 text-slate-700 leading-relaxed italic pr-2 whitespace-pre-wrap">
                    "{output}"
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={handleCopy}
                      className={`flex-1 py-3.5 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                        isCopied 
                        ? 'bg-green-500 text-white shadow-green-100' 
                        : 'bg-rose-400 text-white shadow-rose-200/50 hover:bg-rose-500'
                      }`}
                    >
                      {isCopied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {isCopied ? "Copied!" : "Copy Result"}
                    </button>
                    <button
                      onClick={handleConvert}
                      className="px-5 py-3.5 bg-white border border-rose-100 text-rose-400 rounded-2xl hover:bg-rose-50 transition-all shadow-sm active:scale-95"
                      title="Improve Further"
                    >
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-20 select-none">
                  <Cat className="w-16 h-16 mb-4 text-rose-400" />
                  <p className="text-slate-400 font-medium">Your kind transformation awaits.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Mini History Preview */}
      <div className="mt-4 border-t border-rose-100 pt-6 flex flex-col sm:flex-row justify-between items-center text-slate-400 gap-4">
        <div className="flex gap-4 items-center overflow-hidden w-full sm:w-auto">
          <span className="text-[10px] font-bold uppercase whitespace-nowrap tracking-wider">Recent Mode:</span>
          <div className="flex gap-2 items-center text-xs font-medium text-slate-500">
             <div className="px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm">{mode} Conversion</div>
             <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-rose-400 animate-pulse' : 'bg-green-400'}`}></div>
             <span className="text-[10px] uppercase font-bold tracking-tighter opacity-50">{isLoading ? 'Processing' : 'Ready'}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-rose-100 hover:text-rose-500 transition-colors cursor-pointer text-slate-400 font-bold text-xs ring-1 ring-slate-200">
            ?
          </button>
        </div>
      </div>
    </div>
  );
}
