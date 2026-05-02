import { Cat, Github, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                <Cat className="w-5 h-5 text-rose-400" />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight uppercase">MEOWRA</span>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed font-medium">
              Making digital communication softer, kinder, and more empathetic. 
              Because how you say it matters just as much as what you say.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 mb-6 text-xs uppercase tracking-widest">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-rose-400 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-6 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-rose-400 transition-colors">About Meowra</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Kindness Blog</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-rose-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            © 2026 MEOWRA. ALL RIGHTS RESERVED. MADE WITH <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> FOR A KINDER WORLD.
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-rose-400 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-rose-400 transition-colors"><Github className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
