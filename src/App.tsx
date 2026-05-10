/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Settings, 
  ShieldCheck, 
  Wrench, 
  ShoppingCart, 
  ChevronRight, 
  Layers,
  MessageCircle,
  Bolt,
  Truck,
  Headset,
  MapPin,
  Phone,
  Mail,
  Moon,
  Sun,
  Lock,
  Menu,
  X,
  Plus,
  Send
} from 'lucide-react';

// Pricing API client
const fetchPrediction = async (specs: { cpu_ghz: number; ram_gb: number; storage_gb: number; gpu_rank: number }) => {
  try {
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(specs),
    });
    if (!response.ok) throw new Error('Model warming up...');
    return await response.json();
  } catch (err) {
    console.error('Prediction failed:', err);
    return null;
  }
};

const GPU_LABELS = ['Integrated', 'Budget', 'Mid-Range', 'High-End', 'Enthusiast'];

export default function App() {
  const [specs, setSpecs] = useState({
    cpu_ghz: 3.5, ram_gb: 16, storage_gb: 512, gpu_rank: 2,
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetchPrediction(specs);
      if (res) setPrediction(res.prediction);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [specs]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-dark text-white' : 'bg-slate-50 text-slate-900'} selection:bg-primary/30 font-sans`}>
      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/919539776122" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 left-8 z-[1000] w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 group transition-all"
      >
        <MessageCircle size={28} className="fill-white/10" />
        <span className="absolute left-20 px-3 py-1.5 bg-dark text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-xl">Chat on WhatsApp</span>
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] border-b ${darkMode ? 'border-white/5 bg-[#0f172a]/95' : 'border-slate-200 bg-white/95'} backdrop-blur-xl transition-all h-20`}>
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src="https://i.ibb.co/WN4TJ2Vn/logo.png" 
              alt="2S TechMend Logo" 
              className="w-11 h-11 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all group-hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]" 
            />
            <span className="text-[1.6rem] font-display font-extrabold tracking-tight">
              2S <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">TechMend</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 font-bold text-[0.95rem] tracking-wide">
            <a href="#home" className="nav-link-underline active uppercase relative py-1 text-accent">Home</a>
            <a href="#products" className="nav-link-underline uppercase relative py-1 text-slate-300 hover:text-white transition-colors">Products</a>
            <a href="#services" className="nav-link-underline uppercase relative py-1 text-slate-300 hover:text-white transition-colors">Services</a>
            <a href="#contact" className="nav-link-underline uppercase relative py-1 text-slate-300 hover:text-white transition-colors">Contact</a>
            
            <div className="flex items-center gap-6 ml-6 pl-6 border-l border-white/10">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-white/10 hover:bg-white/20 text-accent' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-95 transition-all">
                <Lock size={16} /> Admin
              </button>
            </div>
          </div>

          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <img 
          src="https://i.ibb.co/nMkLjKT9/back.png" 
          alt="Technical Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-dark/45 z-[1]" />
        
        {/* Grid lines animation */}
        <div className="absolute inset-0 hero-grid-overlay opacity-20 z-[2] animate-[gridMove_20s_linear_infinite]" />
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/15 text-accent text-sm font-bold mb-8 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <Bolt size={14} className="fill-accent" /> Kollam's #1 Computer Shop
            </div>
            
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-display font-extrabold leading-[1.1] tracking-tight mb-8">
              Your Trusted <br />
              <span className="text-accent typewriter-text">Computer Shop</span>
            </h1>
            
            <p className={`text-lg md:text-xl mb-12 max-w-[650px] leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Sales, Repairs & IT Services. Quality products, expert service, and customer satisfaction guaranteed — for home and business.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <a href="#products" className="bg-primary hover:bg-primary-dark text-white px-9 py-4 rounded-lg font-extrabold flex items-center gap-3 transition-all active:scale-95 shadow-[0_4px_15px_rgba(37,99,235,0.35)] hover:-translate-y-1">
                <ShoppingCart size={20} className="fill-white/10" /> Browse Products
              </a>
              <a href="#services" className="bg-transparent hover:bg-white/5 border-2 border-white/20 px-9 py-4 rounded-lg font-extrabold flex items-center gap-3 transition-all active:scale-95 text-white hover:border-accent hover:text-accent group hover:-translate-y-1">
                <Wrench size={20} className="group-hover:rotate-12 transition-transform" /> Our Services
              </a>
            </div>
          </motion.div>
        </div>

        {/* Vertical Branding */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 z-[5] select-none pointer-events-none opacity-20">
          <span className="text-[7rem] font-display font-extrabold rotate-90 text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent p-10 tracking-widest uppercase">
            2stechmend
          </span>
        </div>
      </section>

      {/* About / Features Section */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-dark">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl font-display font-extrabold mb-12 bg-gradient-to-r from-dark dark:from-white to-primary bg-clip-text text-transparent">
            Why Choose 2S TechMend?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, label: "Warranty Protected", desc: "All products come with manufacturer warranty plus our service guarantee." },
              { icon: Wrench, label: "Expert Repairs", desc: "Certified technicians for all brands. Hardware and software solutions." },
              { icon: Truck, label: "Fast Delivery", sub: "Same-day delivery available within 50 KM local range." },
              { icon: Headset, label: "24/7 Support", sub: "Technical support and customer service available round the clock." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-2xl border transition-all duration-500 group ${darkMode ? 'bg-white/5 border-white/5 hover:border-primary/50' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl'}`}
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{item.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc || item.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* AI Estimator (Pricing Matrix Enhancement) */}
      <section id="predictor" className={`py-32 px-6 ${darkMode ? 'bg-slate-900/50' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 tracking-tight">AI Price <br />Predictor.</h2>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed">
              Configure your dream machine and let our Scikit-Learn based machine learning model estimate the optimal market price based on hardware current trends.
            </p>
            <div className="space-y-6">
              {[
                "Highly accurate hardware valuation",
                "Real-time market analytics",
                "Predictive depreciation modeling"
              ].map(item => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                    <ChevronRight size={14} />
                  </div>
                  <span className="font-bold text-sm tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-8 md:p-12 rounded-3xl border border-white/10 ${darkMode ? 'bg-[#0f172a]' : 'bg-white shadow-2xl'} relative overflow-hidden`}>
             <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    <label className="flex items-center gap-2"><Cpu size={14} /> CPU Power</label>
                    <span className="text-primary">{specs.cpu_ghz.toFixed(1)} GHz</span>
                  </div>
                  <input type="range" min="1.5" max="5.5" step="0.1" value={specs.cpu_ghz} onChange={e => setSpecs({...specs, cpu_ghz: parseFloat(e.target.value)})} className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                     <label className="flex items-center gap-2"><Layers size={14} /> RAM Memory</label>
                     <span className="text-primary">{specs.ram_gb} GB</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[8, 16, 32, 64].map(v => (
                      <button key={v} onClick={() => setSpecs({...specs, ram_gb: v})} className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${specs.ram_gb === v ? 'bg-primary border-primary text-white shadow-lg' : 'bg-transparent border-white/10'}`}>{v}GB</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    <label className="flex items-center gap-2"><HardDrive size={14} /> Storage Capacity</label>
                    <span className="text-primary">{specs.storage_gb >= 1024 ? (specs.storage_gb / 1024).toFixed(0) + ' TB' : specs.storage_gb + ' GB'}</span>
                  </div>
                  <input type="range" min="256" max="4096" step="256" value={specs.storage_gb} onChange={e => setSpecs({...specs, storage_gb: parseInt(e.target.value)})} className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" />
                </div>

                <div className="p-8 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <div className="text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-[0.2em]">Estimate Valuation</div>
                  <div className="h-20 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {loading ? (
                         <div className="flex gap-1">
                           {[1,2,3].map(i => <motion.div key={i} animate={{ scaleY: [1,1.5,1] }} transition={{ repeat: Infinity, duration: 0.6, delay: i*0.1 }} className="w-1 h-8 bg-primary rounded-full transition-all" />)}
                         </div>
                      ) : (
                        <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity:1, scale:1 }} className="text-5xl font-extrabold font-display text-accent tracking-tighter">
                          {prediction || "---"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-4">Professional Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Expert technical solutions scaled for both individuals and enterprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              { icon: Cpu, name: "Hardware Repair", desc: "Screen replacement, motherboard repair, power issues, and component upgrades for all brands." },
              { icon: ShieldCheck, name: "Virus Removal", desc: "Complete malware and virus removal with system optimization and security setup." },
              { icon: HardDrive, name: "Data Recovery", desc: "Professional data recovery services for hard drives, SSDs, and external storage devices." },
              { icon: Monitor, name: "System Upgrades", desc: "RAM, SSD, GPU upgrades and full system builds tailored to your needs." },
              { icon: Bolt, name: "Performance Tune", desc: "Thermal repasting, OS optimization and component overclocking for enthusiasts." },
              { icon: MessageCircle, name: "Free Consultation", desc: "Get professional advice on your next build or technical challenge." }
            ].map(s => (
              <div key={s.name} className={`p-10 rounded-3xl border group hover:border-primary transition-all duration-500 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'}`}>
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:-rotate-3 shadow-lg shadow-primary/5">
                  <s.icon size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{s.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`rounded-[2.5rem] overflow-hidden grid md:grid-cols-[1fr_1.5fr] border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-2xl'}`}>
            <div className="p-12 bg-primary text-white flex flex-col justify-between">
               <div>
                  <h3 className="text-3xl font-display font-extrabold mb-6">Let's Talk Tech.</h3>
                  <p className="opacity-80 text-sm mb-12">Connect with us for expert advice on hardware, repairs, or enterprise solutions.</p>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <MapPin size={20} className="opacity-60" />
                      <span className="text-sm font-bold">Kollam 123, Punaloor, Kerala</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone size={20} className="opacity-60" />
                      <span className="text-sm font-bold">+91 95397 76122</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail size={20} className="opacity-60" />
                      <span className="text-sm font-bold">support@2stechmend.com</span>
                    </div>
                  </div>
               </div>

               <div className="flex gap-4 pt-12">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-8 bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition-colors cursor-pointer" />)}
               </div>
            </div>

            <div className="p-12">
               <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Full Name</label>
                     <input type="text" placeholder="John Doe" className={`w-full px-5 py-3 rounded-xl border outline-none transition-all focus:border-primary ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Email Address</label>
                     <input type="email" placeholder="john@example.com" className={`w-full px-5 py-3 rounded-xl border outline-none transition-all focus:border-primary ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
                   </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Inquiry Type</label>
                    <select className={`w-full px-5 py-3 rounded-xl border outline-none transition-all focus:border-primary ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                      <option>Product Purchase</option>
                      <option>System Repair</option>
                      <option>Education/Gov Bulk Order</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Your Message</label>
                    <textarea rows={4} placeholder="Tell us what you're looking for..." className={`w-full px-5 py-3 rounded-xl border outline-none transition-all focus:border-primary resize-none ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
                 </div>
                 <button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl active:scale-[0.98]">
                   <Send size={18} /> Send Inquiry
                 </button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${darkMode ? 'border-white/5 bg-slate-950/50' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">2S</div>
             <span className="font-display font-extrabold text-xl">TechMend</span>
           </div>
           
           <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-500">
             <a href="#home" className="hover:text-primary">Home</a>
             <a href="#products" className="hover:text-primary">Sales</a>
             <a href="#services" className="hover:text-primary">Repair</a>
             <a href="#contact" className="hover:text-primary">Contact</a>
           </div>

           <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
             © 2026 2S TECHMEND COMPUTER SHOP
           </div>
        </div>
      </footer>
    </div>
  );
}
