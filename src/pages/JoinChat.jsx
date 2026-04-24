import { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const AGENT_NAME = 'team_recruiter';

const STARTER_PROMPTS = [
  { label: "I'm a creator — tell me more", icon: Sparkles },
  { label: "I want to join the team", icon: Briefcase },
  { label: "Do I need to live in Florida?", icon: Users },
  { label: "I'm a beginner, is that ok?", icon: ArrowRight },
];

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
          style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser ? 'rounded-br-sm' : 'rounded-bl-sm border'}`}
        style={isUser
          ? { background: '#2B2B2B', color: '#fff' }
          : { background: '#FFFFFF', borderColor: 'rgba(201,169,110,0.25)' }
        }>
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <ReactMarkdown
            className="text-sm leading-relaxed prose prose-sm max-w-none"
            components={{
              p: ({ children }) => <p className="my-1 text-foreground">{children}</p>,
              ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
              ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
              li: ({ children }) => <li className="my-0.5 text-foreground">{children}</li>,
              strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
            }}>
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default function JoinChat() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!conversation?.id) return;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return unsub;
  }, [conversation?.id]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || sending) return;
    setInput('');
    setSending(true);

    let conv = conversation;
    if (!conv) {
      conv = await base44.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: msg.slice(0, 40) }
      });
      setConversation(conv);
    }

    await base44.agents.addMessage(conv, { role: 'user', content: msg });
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const visibleMessages = messages.filter(m => m.role === 'user' || m.role === 'assistant');
  const hasMessages = visibleMessages.length > 0;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col" style={{ background: '#F8F5F0' }}>
      {/* Hero Banner */}
      <div className="py-10 px-4 text-center relative overflow-hidden" style={{ background: '#2B2B2B' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, transparent 70%)' }} />
        <div className="relative">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.3)' }}>
            South Florida's Fastest Growing Team
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-black text-white leading-tight">
            Your Next Chapter <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>Starts Here</span>
          </h1>
          <p className="mt-3 text-white/50 font-body text-sm max-w-md mx-auto">
            No experience required. No relocation needed. Just ambition — and we'll handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link to="/apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#fff' }}>
              Apply as Creator <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/careers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(201,169,110,0.4)', color: '#C9A96E' }}>
              View Careers
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-6">

        {/* Welcome / Starters */}
        {!hasMessages && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-foreground">Elite Team Ambassador</p>
                <p className="text-xs text-muted-foreground font-body">Online now · Replies instantly</p>
              </div>
            </div>

            <div className="bg-white border rounded-2xl rounded-bl-sm p-4 mb-4" style={{ borderColor: 'rgba(201,169,110,0.25)' }}>
              <p className="text-sm text-foreground font-body leading-relaxed">
                Hey! 👋 I'm the Elite Team Ambassador. Whether you're looking to <strong>grow as a creator</strong> or <strong>build a career</strong> with us — you're in the right place. <br /><br />
                We're the fastest-growing creator agency in South Florida, and the best part? <strong>You don't even need to be in Florida.</strong> Everything is done online. What brings you here today?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {STARTER_PROMPTS.map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => sendMessage(label)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-body text-left transition-all hover:-translate-y-0.5 hover:shadow-sm"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(201,169,110,0.3)', color: 'rgba(43,43,43,0.75)' }}>
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: '#C9A96E' }} />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-4">
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <MessageBubble message={msg} />
              </motion.div>
            ))}
          </AnimatePresence>

          {sending && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm border" style={{ background: '#FFFFFF', borderColor: 'rgba(201,169,110,0.25)' }}>
                <div className="flex gap-1.5 items-center h-5">
                  {[0, 0.2, 0.4].map(d => (
                    <motion.div key={d} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#C9A96E' }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: d }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border rounded-2xl p-3 shadow-sm" style={{ borderColor: 'rgba(201,169,110,0.3)' }}>
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask us anything — we're here to help..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm font-body focus:outline-none px-2 py-1"
              style={{ maxHeight: '100px', color: '#2B2B2B' }}
            />
            <Button onClick={() => sendMessage()} disabled={!input.trim() || sending} size="icon"
              className="w-9 h-9 rounded-xl shrink-0"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#fff' }}>
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-body mt-2 text-center">Press Enter to send · <span style={{ color: '#C9A96E' }}>No experience required to join</span></p>
      </div>
    </div>
  );
}