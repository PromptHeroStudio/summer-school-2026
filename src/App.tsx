/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Globe, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  X, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Menu,
  ArrowRight,
  Heart,
  Trash2,
  Printer,
  Copy,
  MoreVertical,
  PlusCircle,
  LayoutGrid,
  LogOut,
  Search,
  Palette,
  Theater,
  Trophy,
  Music,
  BookOpen,
  Mountain,
  ShieldCheck,
  Utensils,
  GraduationCap,
  Info,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Chatbot Knowledge Base ---
const sunnyKB = {
  triggers: [
    {
      keywords: ["german", "deutsch", "language", "speak", "prerequisite", "requirement", "prior"],
      response: "Great question! 🌟 Your child does NOT need to speak German — or even know a single word. Our programme is in English and German, but German is introduced gently through games, songs, and activities. Zero prior knowledge needed. No tests, no pressure — just fun learning!"
    },
    {
      keywords: ["price", "cost", "fee", "pay", "payment", "how much", "KM", "money"],
      response: "The programme costs 500 KM for the full 2 weeks (Aug 3–14), or 300 KM for 1 week. Everything is included — meals, excursions, materials, certificate, t-shirt, and insurance. No hidden extras! To enrol, contact us at info@idss.ba. 📩"
    },
    {
      keywords: ["enrol", "register", "sign up", "apply", "how to join", "application"],
      response: "To enrol your child: 1️⃣ Email us at info@idss.ba or call +387 33 560 520. 2️⃣ We'll send you the forms. 3️⃣ Complete the registration + health forms. 4️⃣ Make payment within 5 business days. Deadline is July 25, 2026 — spots are limited to 25 children!"
    },
    {
      keywords: ["date", "when", "start", "august", "duration", "how long"],
      response: "Summer School 2026 runs from Monday August 3 to Friday August 14, 2026 — that's 10 school days across 2 weeks. Daily hours are 08:00–17:00. You can join for 1 week (300 KM) or the full 2 weeks (500 KM). 📅"
    },
    {
      keywords: ["age", "years old", "old", "how old", "young", "teenager"],
      response: "Our programme is open to children aged 6 to 15 years! 👧👦 We have three groups: Gruppe Junior (6–9), Gruppe Mittel (9–12), and Gruppe Senior (12–15). Each group has its own dedicated educator and age-appropriate programme."
    },
    {
      keywords: ["excursion", "trip", "visit", "trebevic", "bascarsija", "konjic", "visoko", "pyramid", "zoo"],
      response: "The excursions are one of the highlights! 🏔️ Over 2 weeks, children visit: ZOO Bambi, Old Sarajevo (Baščaršija), Trebević Mountain & Cable Car, Visoko Pyramids, Klas factory, and the legendary Titov Bunker (ARK D0) in Konjic. All trips are included in the price!"
    },
    {
      keywords: ["safe", "safety", "supervision", "first aid", "emergency", "accident", "sick", "ill"],
      response: "Safety is our absolute priority. 🏥 Children are supervised 08:00–17:00 every day. All educators are first aid certified. We have emergency protocols, comprehensive insurance, and parents are contacted immediately in case of any incident. The IDSS team has years of experience caring for children."
    },
    {
      keywords: ["food", "meal", "lunch", "breakfast", "snack", "allergy", "diet", "eat"],
      response: "🍽️ Meals are included every day! Breakfast at 08:30, lunch at 12:15, and an afternoon snack at 15:30. On excursion days, we use partner restaurants or prepared packs. All allergies and dietary needs are handled — just declare them on the enrolment form. Nothing is too small to mention!"
    },
    {
      keywords: ["certificate", "diploma", "award"],
      response: "Every child who completes the programme receives a personalised IDSS participation certificate! 🎓 Certificates are presented at the Closing Day ceremony on August 14 — a proud moment for children and parents alike. A digital version is also provided."
    },
    {
      keywords: ["closing day", "last day", "final day", "parents", "ceremony", "presentation", "14 august"],
      response: "The Closing Day on August 14 is something special! 🎉 Children present their projects, an artwork exhibition is held, certificates are awarded, and parents are invited to join from 15:00–17:00. It's a beautiful celebration of everything the children have achieved."
    },
    {
      keywords: ["contact", "email", "phone", "call", "reach", "question"],
      response: "You can reach the IDSS Summer School team at: 📧 info@idss.ba | 📞 +387 33 560 520 | 📍 ul. Buka 13, 71000 Sarajevo. We're available Monday–Friday, 08:00–16:00, and we typically respond to emails within 1 business day."
    },
    {
      keywords: ["international", "foreign", "abroad", "expat", "english", "from outside"],
      response: "Absolutely! 🌍 International families are a core part of our community. In 2025, children joined from the USA, Italy, Spain, Saudi Arabia, Czech Republic, and beyond. The programme runs primarily in English, making it fully accessible to international children. A summer in Sarajevo is an experience they'll never forget!"
    },
    {
      keywords: ["team", "teacher", "educator", "who", "staff", "director"],
      response: "The programme is led by Director Davor Mulalić and Head of Summer School Mubera Ademović — experienced IDSS educators who are trusted by families across Sarajevo and beyond. Three group educators lead the Junior, Mittel, and Senior groups. All staff are vetted, experienced, and passionate about working with children. 👩‍🏫"
    },
    {
      keywords: ["deadline", "last day to apply", "last chance", "how long do I have", "july 25"],
      response: "The enrolment deadline is July 25, 2026. ⚠️ We recommend not waiting — places are limited to 25 children and fill up quickly. Contact us at info@idss.ba to reserve your child's place today!"
    },
    {
      keywords: ["whatsapp", "update", "inform", "communication", "news", "photo"],
      response: "All enrolled families are added to a parent WhatsApp group managed by the Head of Summer School. Every afternoon, a brief update + photo from the day's activities is shared. You're always in the loop! 📱"
    }
  ],
  fallback: "That's a great question! I don't want to give you incomplete information, so I'd suggest reaching out to our team directly — they'll give you a full, personalised answer. 📧 info@idss.ba | 📞 +387 33 560 520. Is there anything else I can help with? ☀️"
};

// --- Components ---

const Section = ({ id, children, className = "", bgColor = "bg-white" }: { id: string, children: React.ReactNode, className?: string, bgColor?: string, key?: React.Key }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-20 px-6 md:px-12 lg:px-24 reveal ${isVisible ? 'visible' : ''} ${bgColor} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <div className={`bg-white rounded-md shadow-md border border-gray-light p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
    {children}
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-light last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left font-ui font-bold text-navy hover:text-navy-light transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-text-body leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi there! ☀️ I'm Sunny, your IDSS Summer School 2026 guide. Ask me anything — about the programme, activities, language, safety, enrolment, or anything else on your mind! I'm here to help. 🌍" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    const lowerInput = input.toLowerCase();
    const match = sunnyKB.triggers.find(t => 
      t.keywords.some(kw => lowerInput.includes(kw))
    );

    const botResponse = { 
      type: 'bot', 
      text: match ? match.response : sunnyKB.fallback 
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white w-[380px] h-[520px] rounded-t-lg shadow-lg flex flex-col overflow-hidden mb-4 border border-gray-light"
          >
            <div className="bg-navy p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/IDSS-Logo.png" alt="IDSS" className="w-6" />
                </div>
                <span className="font-ui font-bold">Summer School Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-off-white">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.type === 'user' 
                      ? 'bg-navy text-white rounded-tr-none' 
                      : 'bg-white text-text-body border-l-4 border-sky shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-light bg-white flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Sunny a question..."
                className="flex-1 px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:border-navy"
              />
              <button 
                onClick={handleSend}
                className="bg-navy text-white p-2 rounded-md hover:bg-navy-light transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-navy rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow rounded-full flex items-center justify-center text-navy font-bold text-xs border-2 border-white">
          ?
        </div>
        <div className="absolute inset-0 rounded-full bg-navy animate-ping opacity-20 group-hover:hidden"></div>
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="https://idss.edu.ba/" target="_blank" rel="noopener noreferrer" className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-light hover:shadow-md transition-shadow block">
            <img src="/IDSS-Logo.png" alt="IDSS Logo" className="h-11" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {['About', 'Programme', 'Excursions', 'Team', 'Enrol', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="font-ui font-semibold text-navy hover:text-navy-light transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="#enrol" 
              className="bg-navy text-yellow px-6 py-3 rounded-full font-ui font-bold hover:bg-navy-light transition-all flex items-center gap-2"
            >
              Enrol Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-light overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {['About', 'Programme', 'Excursions', 'Team', 'Enrol', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="font-ui font-semibold text-navy text-lg"
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="#enrol" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-navy text-yellow px-6 py-4 rounded-full font-ui font-bold text-center"
                >
                  Enrol Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-b from-navy via-navy-light to-sky">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-sky rounded-full blur-[100px] opacity-30"></div>
        
        {/* Mountain Silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,144C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white mb-6"
          >
            Summer School <span className="text-yellow">2026</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-ui italic text-sky-light mb-8"
          >
            Spielen {"->"} Entdecken {"->"} Freunde finden
          </motion.p>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Two unforgettable weeks in the heart of Sarajevo. Adventures, creativity, friendship — and learning that feels like play. For children aged 6 to 15, from all over the world.
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow" /> August 3–14, 2026
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 flex items-center gap-2">
              <Users className="w-5 h-5 text-yellow" /> Ages 6–15
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 flex items-center gap-2">
              <Globe className="w-5 h-5 text-yellow" /> English + German
            </span>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#enrol" className="bg-navy text-yellow px-8 py-4 rounded-full font-ui font-extrabold text-lg shadow-lg hover:scale-105 transition-transform">
              Apply Now — Deadline July 25
            </a>
            <a href="#programme" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-ui font-extrabold text-lg hover:bg-white/10 transition-colors">
              Explore the Programme ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. WELCOME */}
      <Section id="about" bgColor="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl mb-8">Welcome to IDSS Summer School 2026</h2>
            <div className="space-y-6 text-lg leading-relaxed text-text-body">
              <p>
                The IDSS Summer School is back for its second edition — and this year, it's bigger, bolder, and more exciting than ever. Building on the success of our 2025 programme, which welcomed 22 children from the United States, Italy, Spain, Saudi Arabia, the Czech Republic, Bosnia and Herzegovina, and beyond, we are ready to open our doors to 25 young adventurers from around the world.
              </p>
              <p>
                For two weeks in August, your child will explore Sarajevo like never before — from the cable car on Trebević mountain to the ancient streets of Baščaršija, from the mysterious pyramids of Visoko to the legendary Titov Bunker in Konjic. Between the adventures, they will paint, perform, debate, build friendships, and discover the joy of learning languages through real experiences.
              </p>
              <p>
                Our programme is fully bilingual in English and German, with support available in Bosnian, Croatian, and Serbian. Most importantly: <strong>your child does not need to speak any German to participate.</strong> Language is learned naturally — through games, songs, stories, and shared adventures.
              </p>
              <p>
                IDSS Summer School is run entirely by the trusted, experienced team of the Internationale Deutsche Schule Sarajevo — the same educators who teach, guide, and inspire children every day throughout the school year. You can be confident your child is in the safest, most caring hands.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden shadow-lg border-8 border-white">
              <img 
                src="/SUMMER-SCHOOL-2026-Logo.png" 
                alt="Summer Fun" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-yellow p-8 rounded-md shadow-md max-w-[200px]">
              <p className="font-display font-bold text-navy text-2xl leading-tight">
                25 Young Adventurers
              </p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-20">
          <h3 className="text-2xl font-ui font-bold text-navy mb-8 text-center">Past Summer School Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/IDSS-SS-IX-Day-A-1482025-5.jpg",
              "/IDSS-SS-IV-Day-0782025-15.jpg",
              "/IDSS-SS-II-Day-0582025-29.jpg",
              "/IDSS-Day-VIII-138-2025-57.jpg",
              "/IDSS-Day-VII-138-2025-64.jpg",
              "/IDSS-Day-VII-138-2025-6.jpg",
              "/IDSS-Day-VII-138-2025-57b.jpg",
              "/IDSS-Day-VII-138-2025-36.jpg"
            ].map((url, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedImage(url)}
              >
                <img 
                  src={url} 
                  alt={`Activity ${i + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. KEY INFO */}
      <Section id="info" bgColor="bg-sky-light">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Quick Facts</h2>
          <p className="text-xl text-text-muted">Everything you need to know at a glance</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "📅", title: "Dates", content: "August 3 – 14, 2026 (Monday to Friday, 2 weeks)" },
            { icon: "📍", title: "Location", content: "Internationale Deutsche Schule Sarajevo, ul. Buka 13, 71000 Sarajevo, BiH" },
            { icon: "👧", title: "Ages", content: "6 to 15 years old" },
            { icon: "🌐", title: "Languages", content: "English + German (no prior German needed!)" },
            { icon: "⏰", title: "Hours", content: "Daily 08:00 – 17:00" },
            { icon: "🗓️", title: "Enrolment Deadline", content: "July 25, 2026" },
            { icon: "👥", title: "Group Size", content: "Max. 25 children — small, personal groups" },
            { icon: "🏫", title: "Organisation", content: "Fully run by the IDSS school team" },
            { icon: "📜", title: "Certificate", content: "Every child receives a personalised participation certificate" }
          ].map((fact, i) => (
            <Card key={i} className="flex flex-col items-center text-center">
              <div className="text-4xl mb-4">{fact.icon}</div>
              <h3 className="text-xl font-ui font-bold text-navy mb-2">{fact.title}</h3>
              <p className="text-text-body">{fact.content}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. WHO IS IT FOR? */}
      <Section id="groups" bgColor="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-8 text-center">Is This Programme Right for Your Child?</h2>
          <p className="text-lg text-center mb-12 leading-relaxed">
            Our Summer School is designed for curious, energetic children between the ages of 6 and 15. Whether your child is a little explorer just starting to discover the world, or a confident teenager ready for new challenges — we have a group, a team, and a programme tailored just for them.
          </p>

          <div className="space-y-8 mb-16">
            {[
              {
                title: "Group 1 — Gruppe Junior",
                age: "6–9 years",
                focus: "Play, creativity, imagination",
                activities: "Arts & crafts, storytelling, music, introductory German through songs and games, supervised outdoor play",
                leader: "Led by an experienced primary-level educator"
              },
              {
                title: "Group 2 — Gruppe Mittel",
                age: "9–12 years",
                focus: "Language discovery, teamwork, sport",
                activities: "Language games and exercises, team sports and challenges, group projects and creative workshops",
                leader: "Led by a skilled generalist educator with language specialisation"
              },
              {
                title: "Group 3 — Gruppe Senior",
                age: "12–15 years",
                focus: "Communication, leadership, culture",
                activities: "Debate and presentation skills, cultural projects, peer-led activities, community engagement",
                leader: "Led by a senior educator with youth mentoring experience"
              }
            ].map((group, i) => (
              <div key={i} className="bg-white border-l-8 border-navy rounded-r-md shadow-md p-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-ui font-extrabold text-navy mb-2">{group.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-sky-light text-navy-light px-3 py-1 rounded-full text-sm font-bold">Ages: {group.age}</span>
                    <span className="text-text-muted italic">{group.focus}</span>
                  </div>
                  <p className="text-text-body mb-4"><span className="font-bold">Activities:</span> {group.activities}</p>
                  <p className="text-sm text-text-muted font-semibold">👤 {group.leader}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-soft border-2 border-navy rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-ui font-extrabold text-navy mb-4 flex items-center gap-2">
              🌟 Does my child need to speak German?
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-navy">
              <p>
                Absolutely not. German is NOT a prerequisite for enrollment. Children with zero knowledge of German are warmly welcome. Language acquisition happens naturally through daily activities, songs, games, and interactions — with no pressure, no grades, and no expectations beyond curiosity.
              </p>
              <p>
                All activities are fully accessible in English, with Bosnian/Croatian/Serbian support always available.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. PROGRAMME */}
      <Section id="programme" bgColor="bg-off-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">A Day in the Life</h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Every day at IDSS Summer School is thoughtfully structured to balance learning, creativity, adventure, and rest. No two days are the same — but every day is full.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          {[
            { time: "08:00 – 08:30", activity: "Arrival, welcome, morning circle — the day begins with energy and a smile" },
            { time: "08:30 – 09:15", activity: "Breakfast together in school (or packed lunch on excursion days)" },
            { time: "09:15 – 09:30", activity: "Daily theme introduction — new words in German and English" },
            { time: "09:30 – 11:30", activity: "Morning activity block — excursion, workshop, or outdoor programme" },
            { time: "11:30 – 12:15", activity: "Free play and relaxation break" },
            { time: "12:15 – 13:00", activity: "Lunch — in school or at partner restaurant on excursion days" },
            { time: "13:00 – 14:00", activity: "Quiet activity — reading, drawing, or group project work" },
            { time: "14:00 – 15:30", activity: "Afternoon activity — arts, sport, drama, language games" },
            { time: "15:30 – 16:00", activity: "Snack time and free play" },
            { time: "16:00 – 16:45", activity: "Daily review — \"What did we learn today?\" in German and English" },
            { time: "16:45 – 17:00", activity: "Pack up, goodbye circle, handover to parents" }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 mb-4 group">
              <div className="w-32 flex-shrink-0 text-right font-ui font-bold text-navy py-2">{item.time}</div>
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-navy group-hover:scale-125 transition-transform"></div>
                {i < 10 && <div className="w-0.5 flex-1 bg-gray-light my-1"></div>}
              </div>
              <div className="flex-1 bg-white p-4 rounded-md shadow-sm border border-gray-light group-hover:border-navy transition-colors">
                {item.activity}
              </div>
            </div>
          ))}
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Palette />, title: "Creative Workshops", desc: "painting, drawing, crafts, sculpture" },
            { icon: <Theater />, title: "Drama & Performance", desc: "improvisation, skits, storytelling" },
            { icon: <Trophy />, title: "Sport & Games", desc: "team sports, movement games, outdoor challenges" },
            { icon: <Globe />, title: "Language Activities", desc: "German and English through play, music, and daily life" },
            { icon: <BookOpen />, title: "Group Projects", desc: "collaborative learning and creative presentations" },
            { icon: <Mountain />, title: "City Excursions", desc: "guided trips to iconic Sarajevo landmarks" },
            { icon: <Music />, title: "Music & Song", desc: "learning vocabulary through rhythms and melodies" },
            { icon: <Trophy />, title: "Mini-Olympics", desc: "friendly competitions between groups" }
          ].map((act, i) => (
            <Card key={i} className="flex flex-col items-center text-center">
              <div className="text-navy mb-4">{React.cloneElement(act.icon, { className: "w-10 h-10" })}</div>
              <h3 className="font-ui font-bold text-navy mb-2">{act.title}</h3>
              <p className="text-sm text-text-muted">{act.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7. EXCURSIONS */}
      <Section id="excursions" bgColor="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Exploring Sarajevo & Beyond</h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            One of the things that makes IDSS Summer School truly special is the world outside our classroom walls. Every week, your child will embark on guided day trips to some of the most extraordinary places in and around Sarajevo.
          </p>
        </div>

        <div className="space-y-16">
          {/* Week 1 */}
          <div>
            <h3 className="text-3xl font-display font-bold text-navy mb-8 flex items-center gap-4">
              <span className="bg-navy text-white px-4 py-1 rounded-md text-xl">Week 1</span>
              Adventures Begin
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { day: "Mon, Aug 3", title: "Welcome & Creative Day", loc: "IDSS School, ul. Buka 13", desc: "The first day is all about getting comfortable. Children meet their groups, their educators, and their fellow adventurers. Together they create their Summer School journals." },
                { day: "Tue, Aug 4", title: "ZOO Bambi", loc: "ZOO Bambi, Hrasnica, Sarajevo", desc: "A visit to Sarajevo's beloved ZOO Bambi — the children will observe, sketch, and learn the names of animals in German and English." },
                { day: "Wed, Aug 5", title: "Baščaršija & Old Sarajevo", loc: "Baščaršija, Vijećnica, Sebilj", desc: "Guided walking tour of Sarajevo's historic heart. Children will discover the city's Ottoman heritage and visit iconic landmarks with a professional guide." },
                { day: "Thu, Aug 6", title: "Trebević Mountain", loc: "Sarajevska žičara — Trebević", desc: "One of the highlights! Children ride the iconic Sarajevo cable car to the top of Trebević mountain for forest exploration and a picnic." },
                { day: "Fri, Aug 7", title: "Creative Day in School", loc: "IDSS School", desc: "A full creative day — drama workshops, sports, and the preparation of a group presentation showcasing the highlights of Week 1." }
              ].map((ex, i) => (
                <Card key={i} className="flex flex-col h-full">
                  <div className="text-navy font-bold mb-2">{ex.day}</div>
                  <h4 className="text-xl font-ui font-extrabold text-navy-light mb-2">{ex.title}</h4>
                  <div className="text-sm text-text-muted mb-4 flex items-center gap-1"><MapPin className="w-4 h-4" /> {ex.loc}</div>
                  <p className="text-text-body flex-1">{ex.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Week 2 */}
          <div>
            <h3 className="text-3xl font-display font-bold text-navy mb-8 flex items-center gap-4">
              <span className="bg-navy text-white px-4 py-1 rounded-md text-xl">Week 2</span>
              Deeper Discoveries
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { day: "Mon, Aug 10", title: "Visoko Pyramids", loc: "Pyramid of the Sun, Visoko", desc: "A journey to one of Bosnia's most intriguing sites. Children explore the tunnels, natural park, and learn about archaeology." },
                { day: "Tue, Aug 11", title: "Klas d.d. Factory Tour", loc: "Klas d.d., Sarajevo", desc: "An educational tour of one of Bosnia's most well-known food production facilities. Discover how everyday products are made." },
                { day: "Wed, Aug 12", title: "Creative & Sports Day", loc: "IDSS School", desc: "A full day of painting, theatre, music, and a sports tournament. Lunch is a traditional Bosnian treat — burek fresh from a local buregdžinica." },
                { day: "Thu, Aug 13", title: "Konjic & Titov Bunker", loc: "Konjic, ARK D0", desc: "The most epic adventure. Visit the legendary Titov Bunker (ARK D0) — a Cold War-era underground complex. Also visit Konjic's old bazaar." },
                { day: "Fri, Aug 14", title: "Closing Day & Celebration", loc: "IDSS School", desc: "The grand finale. Children present projects, receive certificates, and celebrate. Parents are warmly invited to join from 15:00 onward." }
              ].map((ex, i) => (
                <Card key={i} className="flex flex-col h-full">
                  <div className="text-navy font-bold mb-2">{ex.day}</div>
                  <h4 className="text-xl font-ui font-extrabold text-navy-light mb-2">{ex.title}</h4>
                  <div className="text-sm text-text-muted mb-4 flex items-center gap-1"><MapPin className="w-4 h-4" /> {ex.loc}</div>
                  <p className="text-text-body flex-1">{ex.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 8. OUR TEAM */}
      <Section id="team" bgColor="bg-sky-light">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">The People Who Make It Happen</h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Your child's safety, happiness, and growth are our highest priorities. Our team is part of the trusted IDSS school family.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              name: "Davor Mulalić", 
              role: "Programme Director", 
              image: "/Davor-1.jpg",
              desc: "As Director of IDSS, Davor oversees the Summer School programme at the highest level — ensuring it meets the standards of excellence and safety IDSS is known for." 
            },
            { 
              name: "Mubera Ademović", 
              role: "Head of Summer School", 
              image: "/Mubera-1.jpg",
              desc: "Mubera is the heart of the operation. She plans and leads all daily activities, coordinates the team, and ensures every child feels safe and inspired." 
            },
            { 
              name: "Selma Mujanović", 
              role: "Junior Group Educator", 
              image: "/Selma.jpg",
              desc: "Selma works with our youngest participants. With warmth and patience, she guides children through their first big adventures with creative energy." 
            }
          ].map((member, i) => (
            <Card key={i} className="text-center overflow-hidden">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-md border-2 border-navy-light">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-navy flex items-center justify-center text-white text-3xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-ui font-extrabold text-navy mb-1">{member.name}</h3>
              <p className="text-navy-light font-bold mb-4">{member.role}</p>
              <p className="text-text-body">{member.desc}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center text-text-muted italic">
          <p>Additional educators for Mittel and Senior groups are selected from our experienced IDSS staff.</p>
        </div>
      </Section>

      {/* 9. LANGUAGE POLICY */}
      <Section id="language" bgColor="bg-white">
        <div className="bg-yellow-soft rounded-xl p-12 shadow-lg border-2 border-navy">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">Language at Summer School</h2>
            <p className="text-2xl font-ui font-bold text-navy">🌟 Your child does NOT need to speak German to join.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: "✅", text: "The programme is bilingual: English is the primary language of instruction. German is introduced gently through songs and games." },
              { icon: "✅", text: "Zero prerequisites: Children with absolutely no German knowledge are exactly who this programme is designed for." },
              { icon: "✅", text: "Natural acquisition: Language learning happens through doing — animal names at the ZOO, greetings in the morning circle." },
              { icon: "✅", text: "B/H/S support: Local children always have full support in Bosnian, Croatian, and Serbian from our team." },
              { icon: "✅", text: "No grades, no tests: Summer School is not school. We celebrate progress, never pressure it." }
            ].map((point, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-2xl">{point.icon}</span>
                <p className="text-lg text-navy font-semibold">{point.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl italic text-navy-light max-w-2xl mx-auto">
              "By the end of two weeks, children who arrived knowing zero German will surprise themselves — and their parents — with what they've picked up. That's the magic of immersive, joyful learning."
            </p>
            <p className="mt-4 font-bold text-navy">— IDSS Summer School Team</p>
          </div>
        </div>
      </Section>

      {/* 10. HEALTH & SAFETY */}
      <Section id="safety" bgColor="bg-off-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Your Child's Safety is Our Priority</h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            We take the wellbeing and safety of every child in our care with the utmost seriousness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Continuous supervision", desc: "Children are under the care and supervision of our team from 08:00 to 17:00 every single day." },
            { title: "First aid trained staff", desc: "Every educator holds current first aid certification. First aid kits travel with the group on all excursions." },
            { title: "Emergency protocols", desc: "Head of Summer School maintains a complete emergency contact list. Parents are contacted immediately in any incident." },
            { title: "Enrolment health forms", desc: "Every family completes a detailed health form. Allergies and special needs are reviewed before the programme begins." },
            { title: "Excursion safety", desc: "Educators perform headcounts at departure and arrival. Transport partner is a licensed, vetted company." },
            { title: "School premises security", desc: "The IDSS building is secure and well-maintained. Children are released only to authorised adults." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-md shadow-sm border border-gray-light flex gap-4">
              <div className="text-navy"><ShieldCheck className="w-8 h-8" /></div>
              <div>
                <h4 className="font-ui font-bold text-navy mb-2">{item.title}</h4>
                <p className="text-text-body">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 11. MEALS & NUTRITION */}
      <Section id="meals" bgColor="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/Visual-A.png" 
                alt="Healthy Meals" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl mb-8">Food at Summer School</h2>
            <p className="text-lg mb-8 leading-relaxed">
              Good food is part of a good day. At IDSS Summer School, your child will enjoy three daily meals prepared with care, sourced locally, and always plentiful.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-sky-light p-3 rounded-full text-navy"><Utensils className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-ui font-bold text-navy">Breakfast (08:30 – 09:15)</h4>
                  <p className="text-text-body">A fresh, balanced breakfast served at school every morning.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-sky-light p-3 rounded-full text-navy"><Utensils className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-ui font-bold text-navy">Lunch (12:15 – 13:00)</h4>
                  <p className="text-text-body">A warm, home-cooked lunch served at school or carefully selected local restaurants.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-sky-light p-3 rounded-full text-navy"><Utensils className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-ui font-bold text-navy">Snack (15:30 – 16:00)</h4>
                  <p className="text-text-body">A healthy afternoon snack — fruit, yoghurt, or similar — served daily.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-off-white rounded-md border-l-4 border-navy text-sm">
              <p><strong>Note:</strong> Please declare all food allergies and dietary preferences on the enrolment form. We accommodate all requirements.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 12. CLOSING DAY */}
      <Section id="closing" bgColor="bg-yellow">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6 text-navy">Closing Day — Friday, August 14</h2>
          <p className="text-xl text-navy font-semibold mb-12">
            The final day is not just an ending — it's a celebration of everything your child has learned and experienced.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              { title: "Children's Presentations", desc: "Each group presents their project to parents in English and German." },
              { title: "Exhibition of Artwork", desc: "All creative works produced during the two weeks are displayed for families." },
              { title: "Certificate Ceremony", desc: "Every child receives a personalised, officially stamped IDSS certificate." },
              { title: "Photo Gallery", desc: "A curated digital gallery is shared with all enrolled families." },
              { title: "Celebration", desc: "The day ends with music, laughter, and proud smiles." }
            ].map((item, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm p-6 rounded-md shadow-sm">
                <h4 className="font-ui font-bold text-navy mb-2">{item.title}</h4>
                <p className="text-text-body text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-navy text-white p-8 rounded-md shadow-lg inline-block">
            <h4 className="text-2xl font-ui font-bold mb-2 flex items-center justify-center gap-2 text-white">
              👨‍👩‍👧 Parents are warmly invited!
            </h4>
            <p className="text-lg text-white">Join us from 15:00 to 17:00 on Friday, August 14.</p>
          </div>
        </div>
      </Section>

      {/* 13. ENROLMENT */}
      <Section id="enrol" bgColor="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">How to Enrol Your Child</h2>
          <p className="text-xl text-text-muted">Secure your child's spot for an unforgettable summer</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-navy text-white p-10 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 bg-yellow text-navy font-bold rounded-bl-xl">Best Value</div>
            <h3 className="text-3xl font-ui font-extrabold mb-2 text-white">Full Programme</h3>
            <p className="text-sky-light mb-6">2 Weeks of Adventure</p>
            <div className="text-5xl font-display font-extrabold mb-8 text-white">500 KM</div>
            <ul className="space-y-3 mb-10">
              {['August 3 – 14, 2026', 'All activities & workshops', 'All 5 day excursions', 'All meals included', 'Materials, T-shirt & Certificate'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow" /> {item}
                </li>
              ))}
            </ul>
            <a href="https://idss.edu.ba/summer-school-form/" target="_blank" rel="noopener noreferrer" className="block w-full bg-yellow text-navy text-center py-4 rounded-full font-ui font-extrabold text-lg hover:scale-105 transition-transform">
              Enrol for 2 Weeks
            </a>
          </div>

          <div className="bg-off-white p-10 rounded-xl shadow-md border border-gray-light">
            <h3 className="text-3xl font-ui font-extrabold text-navy mb-2">One Week Only</h3>
            <p className="text-text-muted mb-6">Choose Week 1 or Week 2</p>
            <div className="text-5xl font-display font-extrabold text-navy mb-8">300 KM</div>
            <ul className="space-y-3 mb-10 text-text-body">
              {['Aug 3–7 OR Aug 10–14', 'All activities for the week', 'Scheduled excursions', 'All meals included', 'Materials, T-shirt & Certificate'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-navy" /> {item}
                </li>
              ))}
            </ul>
            <a href="https://idss.edu.ba/summer-school-form/" target="_blank" rel="noopener noreferrer" className="block w-full bg-navy text-white text-center py-4 rounded-full font-ui font-extrabold text-lg hover:bg-navy-light transition-colors">
              Enrol for 1 Week
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-ui font-bold text-navy mb-8 text-center">Enrolment Steps</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { n: "1", t: "Contact us", d: "Email or call to check availability." },
              { n: "2", t: "Get Pack", d: "Receive registration & health forms." },
              { n: "3", t: "Fill Forms", d: "Return completed documents." },
              { n: "4", t: "Payment", d: "Pay within 5 business days." },
              { n: "5", t: "Confirm", d: "Receive official confirmation." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">{step.n}</div>
                <h4 className="font-ui font-bold text-navy mb-1">{step.t}</h4>
                <p className="text-xs text-text-muted">{step.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-red-50 border-l-4 border-red-500 p-6 rounded-md">
            <h4 className="font-ui font-bold text-red-800 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" /> Important Deadline
            </h4>
            <p className="text-red-700">
              Enrolment closes on <strong>July 25, 2026.</strong> Places are limited to 25 children. We strongly recommend early enrolment to avoid disappointment.
            </p>
          </div>
        </div>
      </Section>

      {/* 14. FAQ */}
      <Section id="faq" bgColor="bg-off-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-12 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-md p-8">
            {[
              { q: "Does my child need to speak German?", a: "No — absolutely not. German is NOT a prerequisite for enrolment. Children with zero knowledge of German are warmly welcome. Language is acquired naturally through games, songs, and daily activities." },
              { q: "What languages does the programme operate in?", a: "The programme is bilingual in English and German. English is the primary language of daily communication and instruction. German is introduced gradually and playfully." },
              { q: "My child is very young (6–7 years). Is this appropriate?", a: "Absolutely! Our Gruppe Junior is specifically designed for children aged 6–9, led by an educator with extensive experience working with this age group." },
              { q: "What should my child bring each day?", a: "On regular school days: a water bottle, comfortable clothing, and any prescribed medication. On excursion days: comfortable walking shoes, a light backpack, sunscreen, and a hat." },
              { q: "How do I stay informed about what my child is doing?", a: "All enrolled families are added to a dedicated parent WhatsApp group. A brief daily update — including a photo from the day's activities — is shared each afternoon." },
              { q: "Are excursions included in the price?", a: "Yes — all excursions, including transport and entry fees, are included in the programme price. There are no hidden or additional costs." }
            ].map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* 15. CONTACT */}
      <Section id="contact" bgColor="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Get in Touch</h2>
          <p className="text-xl text-text-muted">We are always happy to hear from you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="w-16 h-16 bg-sky-light rounded-full flex items-center justify-center mx-auto mb-6 text-navy">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-ui font-bold text-navy mb-2">Email</h3>
            <p className="text-navy-light font-bold mb-4">info@idss.ba</p>
            <p className="text-sm text-text-muted">We aim to respond within 1 business day.</p>
          </Card>
          <Card className="text-center">
            <div className="w-16 h-16 bg-sky-light rounded-full flex items-center justify-center mx-auto mb-6 text-navy">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-ui font-bold text-navy mb-2">Phone</h3>
            <p className="text-navy-light font-bold mb-4">+387 33 560 520</p>
            <p className="text-sm text-text-muted">Available Monday–Friday, 08:00–16:00</p>
          </Card>
          <Card className="text-center">
            <div className="w-16 h-16 bg-sky-light rounded-full flex items-center justify-center mx-auto mb-6 text-navy">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-ui font-bold text-navy mb-2">Address</h3>
            <p className="text-navy-light font-bold mb-4">ul. Buka 13, 71000 Sarajevo</p>
            <p className="text-sm text-text-muted">Internationale Deutsche Schule Sarajevo</p>
          </Card>
        </div>
      </Section>

      {/* 16. FOOTER */}
      <footer className="bg-navy-dark text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 lg:col-span-2">
            <a href="https://idss.edu.ba/" target="_blank" rel="noopener noreferrer" className="bg-white inline-block px-4 py-2 rounded-full mb-6 hover:shadow-md transition-shadow">
              <img src="/IDSS-Logo.png" alt="IDSS Logo" className="h-8" />
            </a>
            <p className="text-sky-light opacity-80 max-w-md leading-relaxed">
              Internationale Deutsche Schule Sarajevo (IDSS) is a leading international school in Bosnia and Herzegovina, providing high-quality education in a multicultural environment.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="https://www.facebook.com/idsssarajevo" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-yellow hover:text-navy transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/idss.ba" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-yellow hover:text-navy transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/internationale-deutsche-schule-sarajevo-idss-350229369/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-yellow hover:text-navy transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@internationaledeutscheschu2951" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-yellow hover:text-navy transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-sky-light opacity-60 mb-3 uppercase tracking-wider font-bold">Partner Institution</p>
              <a href="https://www.montessorihouse.ba/" target="_blank" rel="noopener noreferrer" className="inline-block bg-navy px-4 py-2 rounded-lg border border-white/10 hover:border-yellow transition-all">
                <img src="/logo-header.png" alt="Montessori House" className="h-8" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-ui font-bold text-yellow mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sky-light">
              <li><a href="#about" className="hover:text-yellow transition-colors">About</a></li>
              <li><a href="#programme" className="hover:text-yellow transition-colors">Programme</a></li>
              <li><a href="#excursions" className="hover:text-yellow transition-colors">Excursions</a></li>
              <li><a href="#enrol" className="hover:text-yellow transition-colors">Enrolment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-ui font-bold text-yellow mb-6">Contact</h4>
            <ul className="space-y-4 text-sky-light">
              <li>info@idss.ba</li>
              <li>+387 33 560 520</li>
              <li>ul. Buka 13, Sarajevo</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm text-sky-light opacity-60">
          <p>© 2026 Internationale Deutsche Schule Sarajevo. All rights reserved.</p>
        </div>
      </footer>

      {/* 17. CHATBOT */}
      <Chatbot />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-yellow transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged activity" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
