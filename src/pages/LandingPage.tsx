import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MessageSquare, ShieldCheck, Heart } from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-lavender-100/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-xs font-semibold mb-6 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Powered by Empathetic AI
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-slate-800 mb-6 max-w-4xl mx-auto leading-[1.1]">
              Turn blunt into <span className="text-rose-400 italic font-serif">beautiful</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              MEOWRA softens your words without losing your meaning. 
              Bridge the gap between intention and impact in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="px-8 py-4 bg-rose-400 text-white rounded-2xl text-lg font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-200/50 flex items-center gap-2 group active:scale-95"
              >
                Try It Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white border border-rose-200 text-slate-500 rounded-2xl text-lg font-semibold hover:bg-rose-50 transition-all active:scale-95 shadow-sm"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">See the Transformation</h2>
            <p className="text-slate-500">From blunt to beautiful in one click.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-rose-50"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-4 tracking-widest">The Original</div>
              <p className="text-slate-700 font-medium italic mb-6">
                "Fix this code now. It's causing errors and I'm tired of asking."
              </p>
              <div className="w-full h-px bg-rose-50 mb-6" />
              <div className="text-[10px] uppercase font-bold text-rose-400 mb-4 tracking-widest">The Meowra Version</div>
              <p className="text-slate-700 font-medium leading-relaxed">
                "Hey! I noticed some recurring errors in the code. Could we take a look and get it fixed? I'd really appreciate your help on this!"
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-rose-50"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-4 tracking-widest">The Original</div>
              <p className="text-slate-700 font-medium italic mb-6">
                "I can't make it to your party. I'm busy."
              </p>
              <div className="w-full h-px bg-rose-50 mb-6" />
              <div className="text-[10px] uppercase font-bold text-rose-400 mb-4 tracking-widest">The Meowra Version</div>
              <p className="text-slate-700 font-medium leading-relaxed">
                "Thank you so much for the invite! I'd love to celebrate with you, but unfortunately, I've got something else on that day. Have a blast!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-rose-100/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-200 transition-colors duration-500 shadow-inner">
                <MessageSquare className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Paste your text</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Enter your blunt email, text, or comment into our intuitive converter.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-rose-100/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-200 transition-colors duration-500 shadow-inner">
                <Sparkles className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Choose your tone</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Select from Friendly, Professional, Gentle, or Apologetic styles.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-rose-100/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-200 transition-colors duration-500 shadow-inner">
                <Heart className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Share the love</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Copy your new, kinder message and communicate with empathy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 bg-white border-y border-rose-50 shadow-sm relative z-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-12 sm:gap-24 opacity-50">
           <div className="flex items-center gap-3 font-bold text-lg text-slate-400 tracking-tighter"><ShieldCheck className="w-6 h-6 text-slate-300" /> PRIVATE</div>
           <div className="flex items-center gap-3 font-bold text-lg text-slate-400 tracking-tighter"><Sparkles className="w-6 h-6 text-slate-300" /> SMART AI</div>
           <div className="flex items-center gap-3 font-bold text-lg text-slate-400 tracking-tighter"><MessageSquare className="w-6 h-6 text-slate-300" /> CONTEXTUAL</div>
        </div>
      </section>
    </div>
  );
}
