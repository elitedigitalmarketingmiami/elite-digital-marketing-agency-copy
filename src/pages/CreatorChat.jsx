import { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Crown, Loader2, Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const AGENT_NAME = 'creator_growth_strategist';

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
          style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>
          <Crown className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser
        ? 'text-white rounded-br-sm'
        : 'rounded-bl-sm border'
        }`}
        style={isUser
          ? { background: 'linear-gradient(135deg, #C9A96E, #a8845a)' }
          : { background: '#FFFFFF', borderColor: 'rgba(201,169,110,0.25)' }
        }>
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <ReactMarkdown className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:font-display prose-strong:text-foreground"
            components={{
              p: ({ children }) => <p className="my-1">{children}</p>,
              ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
              ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
              li: ({ children }) => <li className="my-0.5">{children}</li>,
            }}>
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default function CreatorChat() {
  const [conversation, setConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

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

  const loadConversations = async () => {
    setLoading(true);
    const list = await base44.agents.listConversations({ agent_name: AGENT_NAME });
    setConversations(list || []);
    setLoading(false);
  };

  const startNewConversation = async () => {
    const conv = await base44.agents.createConversation({
      agent_name: AGENT_NAME,
      metadata: { name: `Strategy Session — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` }
    });
    setConversation(conv);
    setMessages(conv.messages || []);
    setConversations(prev => [conv, ...prev]);
  };

  const selectConversation = async (conv) => {
    const full = await base44.agents.getConversation(conv.id);
    setConversation(full);
    setMessages(full.messages || []);
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput('');
    setSending(true);

    let conv = conversation;
    if (!conv) {
      conv = await base44.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: text.slice(0, 40) }
      });
      setConversation(conv);
      setConversations(prev => [conv, ...prev]);
    }

    await base44.agents.addMessage(conv, { role: 'user', content: text });
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const visibleMessages = messages.filter(m => m.role === 'user' || m.role === 'assistant');

  return (
    <div className="flex h-[calc(100vh-80px)]" style={{ background: '#F8F5F0' }}>
      {/* Sidebar */}
      <div className="w-64 border-r shrink-0 flex flex-col" style={{ borderColor: 'rgba(201,169,110,0.2)', background: '#FFFFFF' }}>
        <div className="p-4 border-b" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5" style={{ color: '#C9A96E' }} />
            <span className="font-display font-bold text-sm text-foreground uppercase tracking-wider">Growth AI</span>
          </div>
          <Button onClick={startNewConversation} className="w-full gap-2 font-display font-semibold text-xs"
            style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#fff' }}>
            <Plus className="w-4 h-4" /> New Session
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8 font-body px-3">Start a new session to get personalized growth strategies.</p>
          ) : (
            conversations.map(c => (
              <button key={c.id} onClick={() => selectConversation(c)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-body transition-all flex items-center gap-2"
                style={{
                  background: conversation?.id === c.id ? 'rgba(201,169,110,0.12)' : 'transparent',
                  color: conversation?.id === c.id ? '#C9A96E' : 'rgba(43,43,43,0.6)',
                }}>
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{c.metadata?.name || 'Strategy Session'}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-white" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
          <h1 className="font-serif text-xl font-bold text-foreground">Elite Growth Strategist</h1>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Your personal AI advisor for creator growth, revenue & strategy</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {!conversation && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Welcome to Your Growth Suite</h2>
              <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
                Ask anything — content strategy, revenue optimization, subscriber retention, platform tactics, and more.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {[
                  'How do I grow my OnlyFans from $2k to $10k/month?',
                  'What PPV pricing strategy works best?',
                  'How do I reactivate expired subscribers?',
                  'Help me build a content schedule for this week',
                ].map(prompt => (
                  <button key={prompt} onClick={() => { setInput(prompt); }}
                    className="text-left px-4 py-3 rounded-xl border text-xs font-body transition-all hover:-translate-y-0.5"
                    style={{ borderColor: 'rgba(201,169,110,0.3)', background: '#FFFFFF', color: 'rgba(43,43,43,0.7)' }}>
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

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
                <Crown className="w-4 h-4 text-white" />
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
        <div className="px-6 py-4 border-t bg-white" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your growth strategist anything..."
              rows={1}
              className="flex-1 resize-none rounded-xl border px-4 py-3 text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary bg-background"
              style={{ borderColor: 'rgba(201,169,110,0.3)', maxHeight: '120px' }}
            />
            <Button onClick={sendMessage} disabled={!input.trim() || sending} size="icon"
              className="w-11 h-11 rounded-xl shrink-0"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#fff' }}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground font-body mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}