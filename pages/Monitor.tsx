import React from 'react';
import { Activity, ExternalLink, ThumbsUp, ThumbsDown, AlertOctagon } from 'lucide-react';

const Monitor: React.FC = () => {
  const alerts = [
    { id: 1, prompt: "Best CRM for small business", source: "DeepSeek", sentiment: "positive", rank: 1, text: "MyCRM-Pro is cited as the most cost-effective solution..." },
    { id: 2, prompt: "Salesforce alternatives 2025", source: "Doubao", sentiment: "neutral", rank: 3, text: "Listed alongside Zoho and HubSpot." },
    { id: 3, prompt: "MyCRM-Pro pricing hidden fees", source: "ChatGPT", sentiment: "negative", rank: 1, text: "Some users report unexpected costs...", error: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-slate-100">F4.1 Insight Dashboard</h2>
           <p className="text-slate-400 mt-1">Real-time monitoring of AI responses to your tracked prompts.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded border border-slate-700 transition-colors">
            Refresh Probe
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row gap-6 hover:border-slate-600 transition-colors">
            <div className="flex-shrink-0">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 
                  ${alert.sentiment === 'positive' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 
                    alert.sentiment === 'negative' ? 'bg-red-900/20 border-red-500/50 text-red-400' :
                    'bg-slate-700/50 border-slate-600 text-slate-400'}`}>
                  {alert.sentiment === 'positive' ? <ThumbsUp className="w-6 h-6" /> : 
                   alert.sentiment === 'negative' ? <ThumbsDown className="w-6 h-6" /> :
                   <Activity className="w-6 h-6" />}
               </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-950 px-2 py-1 rounded">
                  {alert.source}
                </span>
                <h3 className="text-lg font-medium text-slate-200">{alert.prompt}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-700 pl-4">
                "{alert.text}"
              </p>
              
              {alert.error && (
                <div className="mt-4 bg-red-900/10 border border-red-900/50 p-3 rounded flex items-start">
                   <AlertOctagon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-red-400 text-sm font-medium">Fact Verification Alert</p>
                     <p className="text-red-400/70 text-xs mt-1">AI hallucinated "unexpected costs". Suggested Action: Publish clarification article on Pricing Page.</p>
                   </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end justify-center min-w-[120px]">
               <div className="text-center">
                  <span className="block text-xs text-slate-500 mb-1">Rank Position</span>
                  <span className="text-2xl font-bold text-slate-100">#{alert.rank}</span>
               </div>
               <button className="mt-4 text-xs text-indigo-400 flex items-center hover:text-indigo-300">
                  View Full Thread <ExternalLink className="w-3 h-3 ml-1" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monitor;
