import React, { useState } from 'react';
import { generateGeoContent } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, FileText, Copy, Check, Loader2 } from 'lucide-react';

const Factory: React.FC = () => {
  const [question, setQuestion] = useState('Which enterprise CRM is better: Salesforce or Hubspot?');
  const [brandName, setBrandName] = useState('MyCRM-Pro');
  const [context, setContext] = useState('- Market Share: 15%\n- Price: $12/user/mo (vs Salesforce $25)\n- Features: AI Auto-email included, Unlimited contacts.\n- Latest Data 2024: Customer satisfaction 98%.');
  const [competitors, setCompetitors] = useState('Salesforce: Expensive, complex.\nHubspot: Good marketing, expensive support.');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateGeoContent(question, brandName, context, competitors);
    setContent(result);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
      {/* Input Panel */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-800/50">
          <h3 className="font-semibold text-slate-100 flex items-center">
            <Bot className="w-5 h-5 mr-2 text-indigo-400" />
            Content Engine Config
          </h3>
        </div>
        
        <div className="p-6 space-y-4 overflow-auto flex-1 custom-scrollbar">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Target Prompt</label>
            <input 
              type="text" 
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-sm text-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Brand Name</label>
                <input 
                  type="text" 
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-sm text-slate-200 focus:border-indigo-500 outline-none"
                />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Our Product Data (Context)</label>
            <textarea 
              value={context}
              onChange={e => setContext(e.target.value)}
              rows={5}
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-sm text-slate-200 focus:border-indigo-500 outline-none font-mono"
            />
            <p className="text-xs text-slate-500 mt-1">Include stats for "Data Hooks".</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Competitor Info</label>
            <textarea 
              value={competitors}
              onChange={e => setCompetitors(e.target.value)}
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-sm text-slate-200 focus:border-indigo-500 outline-none font-mono"
            />
          </div>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2 w-5 h-5" />}
            Generate GEO Content
          </button>
        </div>
      </div>

      {/* Output Panel */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden relative">
         <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-100 flex items-center">
            Preview
            <span className="ml-2 text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded border border-green-800">Markdown</span>
          </h3>
          <button 
            onClick={handleCopy}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8 bg-slate-900 text-slate-300">
           {content ? (
             <div className="prose prose-invert prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-slate-600">
               <FileText className="w-16 h-16 mb-4 opacity-20" />
               <p>Generated content will appear here.</p>
               <p className="text-sm mt-2 opacity-50">Includes tables, data hooks, and comparison grids.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Factory;
