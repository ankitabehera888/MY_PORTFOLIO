import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  TrendingUp, 
  Mail, 
  Send, 
  Copy, 
  Check, 
  RefreshCw, 
  Cpu, 
  UserCheck
} from 'lucide-react';

export const AgentPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finance' | 'email'>('finance');

  // Finance Agent State
  const financePresets = [
    { label: "NVDA Live Analysis", query: "Analyze NVDA: Current stock price, analyst consensus, and data center revenue trends." },
    { label: "AAPL Market Pulse", query: "Get AAPL price, latest DuckDuckGo headline sentiment, and Q3 analyst price targets." },
    { label: "MSFT Cloud & AI Growth", query: "Check MSFT market performance, Azure AI announcements, and Wall Street rating." }
  ];

  const [financeInput, setFinanceInput] = useState(financePresets[0].query);
  const [isFinanceLoading, setIsFinanceLoading] = useState(false);
  const [financeResult, setFinanceResult] = useState<{
    ticker: string;
    price: string;
    change: string;
    consensus: string;
    latency: string;
    toolsUsed: string[];
    summary: string;
  }>({
    ticker: "NVDA",
    price: "$142.80",
    change: "+4.2% Today",
    consensus: "Strong Buy (92% Positive)",
    latency: "340ms (Groq LLaMA 3.3)",
    toolsUsed: ["YFinance API", "DuckDuckGo News Crawler", "Agno Multi-Agent Orchestrator"],
    summary: "NVIDIA is demonstrating accelerated momentum driven by sustained hyperscaler demand for Blackwell architecture. Institutional consensus remains predominantly 'Strong Buy' with an average 12-month target of $165. Recent sentiment highlights minimal supply bottlenecks and solid margin expansion."
  });

  // Email Classifier State
  const emailPresets = [
    { 
      label: "Meeting Reschedule", 
      text: "Hi Ankita, can we push our scheduled sprint review from Tuesday morning to Thursday at 2:30 PM? Let me know if that works.",
      category: "MEETING_RESCHEDULE",
      confidence: "98.7%"
    },
    { 
      label: "Leave Request", 
      text: "Dear Team, I will be attending the university semester examinations from June 12 to June 15 and would like to request study leave.",
      category: "LEAVE_APPLICATION",
      confidence: "97.4%"
    },
    { 
      label: "Interview Inquiry", 
      text: "We were impressed with your Agentic AI projects and would love to schedule a technical discussion for our AI/ML internship position.",
      category: "INTERVIEW_INVITE",
      confidence: "99.1%"
    }
  ];

  const [emailInput, setEmailInput] = useState(emailPresets[0].text);
  const [selectedRole, setSelectedRole] = useState<'Manager' | 'HR' | 'Professor' | 'Client' | 'Employee'>('Manager');
  const [emailResult, setEmailResult] = useState({
    intent: emailPresets[0].category,
    confidence: emailPresets[0].confidence,
    reply: "Hi, Thursday at 2:30 PM works perfectly for the sprint review. I will update the calendar invite and coordinate the agenda accordingly. Thanks!"
  });
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handlers
  const handleRunFinance = (queryToRun?: string) => {
    const q = queryToRun || financeInput;
    setIsFinanceLoading(true);
    setTimeout(() => {
      let ticker = "NVDA";
      let price = "$142.80";
      let change = "+4.2%";
      let consensus = "Strong Buy (92%)";
      let summary = "Strong demand across compute clusters.";

      if (q.includes("AAPL")) {
        ticker = "AAPL";
        price = "$234.15";
        change = "+1.8%";
        consensus = "Moderate Buy (78%)";
        summary = "Apple ecosystem resilience and steady services revenue growth offsetting hardware cycle moderation. Price target: $250.";
      } else if (q.includes("MSFT")) {
        ticker = "MSFT";
        price = "$448.50";
        change = "+2.4%";
        consensus = "Strong Buy (89%)";
        summary = "Microsoft Azure AI workloads increasing annual recurring revenue; Copilot enterprise adoption showing double-digit quarter-over-quarter expansion.";
      }

      setFinanceResult({
        ticker,
        price,
        change,
        consensus,
        latency: "318ms (Groq LLaMA 3.3)",
        toolsUsed: ["YFinance API", "DuckDuckGo News Search", "Agno Tool Caller"],
        summary
      });
      setIsFinanceLoading(false);
    }, 700);
  };

  const handleRunEmail = (textToRun?: string, role = selectedRole) => {
    const t = textToRun || emailInput;
    setIsEmailLoading(true);
    setTimeout(() => {
      let intent = "MEETING_RESCHEDULE";
      let confidence = "98.5%";
      let reply = "";

      if (t.toLowerCase().includes("leave") || t.toLowerCase().includes("examination")) {
        intent = "LEAVE_APPLICATION";
        confidence = "97.8%";
        if (role === 'Manager') {
          reply = "Your leave request for the examination period is approved. Best of luck with your papers, and please ensure current tasks are handed off.";
        } else if (role === 'Professor') {
          reply = "Acknowledged. Your attendance is noted for the university exam dates. Please review the lecture notes upon your return.";
        } else if (role === 'HR') {
          reply = "Your study leave has been recorded in the attendance portal for the specified dates. Best wishes for your examinations.";
        } else {
          reply = "Thank you for the update. The team will cover your operational checkpoints during this period.";
        }
      } else if (t.toLowerCase().includes("interview") || t.toLowerCase().includes("internship")) {
        intent = "INTERVIEW_INVITE";
        confidence = "99.4%";
        reply = "Thank you very much for reaching out! I would be delighted to speak about the AI/ML internship role and walk through my multi-agent systems and classification pipelines. I am available throughout this week.";
      } else {
        intent = "MEETING_RESCHEDULE";
        confidence = "98.7%";
        if (role === 'Manager') {
          reply = `Thursday at 2:30 PM works well. I've noted the updated timestamp on the project board.`;
        } else if (role === 'Client') {
          reply = `Certainly! I will adjust the client sync to Thursday at 2:30 PM and send the refreshed meeting link.`;
        } else {
          reply = `Received. Thursday at 2:30 PM is confirmed on my calendar.`;
        }
      }

      setEmailResult({ intent, confidence, reply });
      setIsEmailLoading(false);
    }, 550);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-24 sm:py-32 border-b border-[#E7E5E0]/70 dark:border-slate-800/70 bg-transparent relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#737373] dark:text-slate-400 uppercase">
            04 // INTERACTIVE AGENT ARENA
          </span>
          <span className="h-[1px] flex-1 bg-[#E7E5E0] dark:bg-slate-800" />
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-xs font-mono-code text-emerald-800 dark:text-emerald-400 font-bold uppercase">
                LIVE SANDBOX EVALUATION
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#121212] dark:text-slate-100 tracking-tighter uppercase">
              AGENT PLAYGROUND
            </h2>
            <p className="text-base sm:text-lg text-[#6B7280] dark:text-slate-400 mt-3 max-w-xl">
              Test Ankita's multi-agent financial assistant and 90.15% benchmarked email intent classifier in real time.
            </p>
          </div>

          {/* Model Mode Switcher */}
          <div className="flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#DDDCD5] dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'finance'
                  ? 'bg-[#121212] dark:bg-emerald-500 text-[#FAF9F5] dark:text-slate-950 shadow-xs'
                  : 'text-[#4A4A45] dark:text-slate-400 hover:text-[#121212] dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400 dark:text-slate-950" />
              <span>FINANCE AGENT</span>
            </button>

            <button
              onClick={() => setActiveTab('email')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'email'
                  ? 'bg-[#121212] dark:bg-emerald-500 text-[#FAF9F5] dark:text-slate-950 shadow-xs'
                  : 'text-[#4A4A45] dark:text-slate-400 hover:text-[#121212] dark:hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 text-sky-400 dark:text-slate-950" />
              <span>EMAIL INTENT ENGINE</span>
            </button>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-[#DDDCD5] dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          {activeTab === 'finance' ? (
            /* ================= FINANCE AGENT INTERFACE ================= */
            <div className="space-y-8">
              {/* Presets */}
              <div>
                <div className="text-xs font-mono-code font-bold uppercase text-[#737373] dark:text-slate-400 mb-3">
                  QUICK PROMPTS (CLICK TO EVALUATE)
                </div>
                <div className="flex flex-wrap gap-2">
                  {financePresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setFinanceInput(preset.query);
                        handleRunFinance(preset.query);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-mono-code font-bold bg-[#FAF9F5] dark:bg-slate-800/80 hover:bg-[#EFEFEA] dark:hover:bg-slate-800 text-[#121212] dark:text-slate-200 border border-[#DDDCD5] dark:border-slate-700 transition-colors"
                    >
                      {preset.label} ↗
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input Box */}
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#FAF9F5] dark:bg-slate-800/80 rounded-t-2xl border border-b-0 border-[#DDDCD5] dark:border-slate-700 text-xs font-mono-code text-[#6B7280] dark:text-slate-400">
                  <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>NATURAL LANGUAGE FINANCIAL QUERY</span>
                </div>
                <div className="flex flex-col sm:flex-row border border-[#DDDCD5] dark:border-slate-700 rounded-b-2xl overflow-hidden focus-within:border-[#121212] dark:focus-within:border-emerald-500 transition-colors">
                  <input
                    type="text"
                    value={financeInput}
                    onChange={(e) => setFinanceInput(e.target.value)}
                    placeholder="Enter ticker or company prompt..."
                    className="flex-1 px-5 py-4 text-sm sm:text-base text-[#121212] dark:text-slate-100 bg-white dark:bg-slate-950 focus:outline-none font-medium"
                  />
                  <button
                    onClick={() => handleRunFinance()}
                    disabled={isFinanceLoading}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#121212] dark:bg-emerald-500 text-[#FAF9F5] dark:text-slate-950 hover:bg-[#2B2B29] dark:hover:bg-emerald-400 font-bold text-sm tracking-wide transition-colors disabled:opacity-60 shrink-0"
                  >
                    {isFinanceLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-300 dark:text-slate-950" />
                        <span>ORCHESTRATING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-300 dark:text-slate-950" />
                        <span>RUN AGENT PIPELINE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Realtime Result Dashboard */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] dark:bg-slate-950 border border-[#DDDCD5] dark:border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E7E1] dark:border-slate-800 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black font-mono-code text-[#121212] dark:text-slate-100">
                      {financeResult.ticker}
                    </span>
                    <span className="text-lg sm:text-xl font-bold font-mono-code text-emerald-700 dark:text-emerald-400">
                      {financeResult.price}
                    </span>
                    <span className="text-xs font-mono-code px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold">
                      {financeResult.change}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#6B7280] dark:text-slate-400">
                    <Cpu className="w-3.5 h-3.5 text-sky-500" />
                    <span>Inference Latency: <strong>{financeResult.latency}</strong></span>
                  </div>
                </div>

                {/* Tool Orchestration Visualizer */}
                <div>
                  <div className="text-[11px] font-mono-code text-[#737373] dark:text-slate-400 uppercase mb-2">
                    AUTONOMOUS TOOLS EXECUTED:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {financeResult.toolsUsed.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-mono-code bg-white dark:bg-slate-900 border border-[#DDDCD5] dark:border-slate-800 text-[#121212] dark:text-slate-200 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Synthesis Narrative */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-[#DDDCD5] dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-code font-bold text-[#121212] dark:text-slate-100 uppercase">
                      SYNTHESIZED INTELLIGENCE SUMMARY
                    </span>
                    <span className="text-xs font-mono-code font-bold text-emerald-800 dark:text-emerald-400">
                      {financeResult.consensus}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#374151] dark:text-slate-300 leading-relaxed">
                    {financeResult.summary}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ================= EMAIL CLASSIFIER INTERFACE ================= */
            <div className="space-y-8">
              {/* Presets */}
              <div>
                <div className="text-xs font-mono-code font-bold uppercase text-[#737373] dark:text-slate-400 mb-3">
                  SAMPLE INCOMING EMAILS
                </div>
                <div className="flex flex-wrap gap-2">
                  {emailPresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setEmailInput(preset.text);
                        handleRunEmail(preset.text);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-mono-code font-bold bg-[#FAF9F5] dark:bg-slate-800/80 hover:bg-[#EFEFEA] dark:hover:bg-slate-800 text-[#121212] dark:text-slate-200 border border-[#DDDCD5] dark:border-slate-700 transition-colors"
                    >
                      {preset.label} ↗
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div className="relative">
                <div className="flex items-center justify-between px-4 py-3 bg-[#FAF9F5] dark:bg-slate-800/80 rounded-t-2xl border border-b-0 border-[#DDDCD5] dark:border-slate-700 text-xs font-mono-code text-[#6B7280] dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-500" />
                    <span>INCOMING EMAIL TEXT (CLASSIFIER INGESTION)</span>
                  </div>
                  <span>50,000 Trained Dataset</span>
                </div>
                <textarea
                  rows={3}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-5 py-4 text-sm sm:text-base text-[#121212] dark:text-slate-100 bg-white dark:bg-slate-950 border border-[#DDDCD5] dark:border-slate-700 focus:outline-none focus:border-[#121212] dark:focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Role Selection & Classification Run */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F5F4EE] dark:bg-slate-950 border border-[#DDDCD5] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#121212] dark:text-slate-100" />
                  <span className="text-xs font-mono-code font-bold uppercase text-[#121212] dark:text-slate-200">
                    SELECT SENDER ROLE TONE:
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(['Manager', 'HR', 'Professor', 'Client', 'Employee'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        handleRunEmail(undefined, role);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all ${
                        selectedRole === role
                          ? 'bg-[#121212] dark:bg-emerald-500 text-[#FAF9F5] dark:text-slate-950'
                          : 'bg-white dark:bg-slate-800 border border-[#DDDCD5] dark:border-slate-700 text-[#4A4A45] dark:text-slate-300 hover:bg-[#EAE9E2] dark:hover:bg-slate-700'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleRunEmail()}
                  disabled={isEmailLoading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#121212] dark:bg-emerald-500 text-[#FAF9F5] dark:text-slate-950 hover:bg-[#2B2B29] dark:hover:bg-emerald-400 font-bold text-xs font-mono-code rounded-xl transition-colors disabled:opacity-60"
                >
                  {isEmailLoading ? 'PREDICTING...' : 'PREDICT & GENERATE'}
                </button>
              </div>

              {/* Classification & Role Reply Output */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] dark:bg-slate-950 border border-[#DDDCD5] dark:border-slate-800 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-[#E8E7E1] dark:border-slate-800">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-[#DDDCD5] dark:border-slate-800">
                    <div className="text-[11px] font-mono-code text-[#737373] dark:text-slate-400 uppercase mb-1">
                      PREDICTED INTENT CATEGORY
                    </div>
                    <div className="text-base sm:text-lg font-black font-mono-code text-sky-700 dark:text-sky-400">
                      {emailResult.intent}
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-[#DDDCD5] dark:border-slate-800">
                    <div className="text-[11px] font-mono-code text-[#737373] dark:text-slate-400 uppercase mb-1">
                      LINEAR SVM CONFIDENCE SCORE
                    </div>
                    <div className="text-base sm:text-lg font-black font-mono-code text-emerald-700 dark:text-emerald-400">
                      {emailResult.confidence}
                    </div>
                  </div>
                </div>

                {/* Generated Email Reply */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-[#DDDCD5] dark:border-slate-800 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-code font-bold text-[#121212] dark:text-slate-100 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      ROLE-AWARE AUTO-REPLY ({selectedRole.toUpperCase()})
                    </span>
                    <button
                      onClick={() => copyToClipboard(emailResult.reply)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono-code bg-[#FAF9F5] dark:bg-slate-800 border border-[#DDDCD5] dark:border-slate-700 hover:bg-[#EAE9E2] dark:hover:bg-slate-700 text-[#121212] dark:text-slate-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY REPLY</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm sm:text-base text-[#121212] dark:text-slate-200 leading-relaxed font-normal italic">
                    "{emailResult.reply}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
