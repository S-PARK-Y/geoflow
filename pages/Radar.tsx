import React, { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, AlertTriangle, ExternalLink } from 'lucide-react';
import { expandPrompts } from '../services/gemini';
import { PromptItem, SourceType, Source } from '../types';

const Radar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsScanning(true);
    setPrompts([]);

    // Call Gemini Service
    const results = await expandPrompts(keyword);
    
    // Simulate "Checking Network Trigger" delay
    setTimeout(() => {
        setPrompts(results);
        setIsScanning(false);
    }, 1500);
  };

  const handleAnalyze = (id: string) => {
    setAnalyzingId(id);
    // Simulate scraping logic (DeepSeek analysis)
    setTimeout(() => {
        setPrompts(prev => prev.map(p => {
            if (p.id === id) {
                // Mock logic: Generate realistic looking sources based on context
                const sources: Source[] = [];
                
                // Logic to determine sources based on category for realism
                if (p.category === 'Solution' || p.text.toLowerCase().includes('code') || p.text.toLowerCase().includes('implement')) {
                     sources.push({ 
                        domain: 'csdn.net', 
                        url: 'https://blog.csdn.net', 
                        title: `Implementation guide for ${keyword}`, 
                        type: SourceType.CSDN 
                    });
                    sources.push({ 
                        domain: 'juejin.cn', 
                        url: 'https://juejin.cn', 
                        title: `Best practices: ${p.text}`, 
                        type: SourceType.OTHERS 
                    });
                } else if (p.category === 'Definition' || p.category === 'Comparison') {
                    sources.push({ 
                        domain: 'zhihu.com', 
                        url: 'https://www.zhihu.com', 
                        title: `Discussion: ${p.text}`, 
                        type: SourceType.ZHIHU 
                    });
                    sources.push({ 
                        domain: 'baike.baidu.com', 
                        url: 'https://baike.baidu.com', 
                        title: `${keyword} Encyclopedia`, 
                        type: SourceType.OTHERS 
                    });
                } else {
                    sources.push({ 
                        domain: '36kr.com', 
                        url: 'https://36kr.com', 
                        title: `Market Analysis: ${keyword}`, 
                        type: SourceType.MEDIA_36KR 
                    });
                     sources.push({ 
                        domain: 'mp.weixin.qq.com', 
                        url: '#', 
                        title: `Official Account Article`, 
                        type: SourceType.OFFICIAL_SITE 
                    });
                }

                return { ...p, topSources: sources, lastChecked: new Date().toLocaleTimeString() };
            }
            return p;
        }));
        setAnalyzingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold mb-4 text-slate-100">F1.1 Core Word Fission</h2>
        <p className="text-slate-400 mb-6">
          Enter a core product keyword to generate a Prompt Matrix and detect which questions trigger AI network search.
        </p>
        <form onSubmit={handleScan} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., Enterprise CRM, Cloud Storage, Python Automation"
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            {isScanning ? 'Scanning...' : 'Activate Radar'}
          </button>
        </form>
      </div>

      {prompts.length > 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-100">Discovered Prompts ({prompts.length})</h3>
            <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">Target: DeepSeek V3</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-400 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">Prompt Text</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Networking</th>
                  <th className="px-6 py-4 font-medium">Top Sources (Ranked)</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {prompts.map((prompt) => (
                  <tr key={prompt.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200 font-medium">{prompt.text}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${prompt.category === 'Solution' ? 'bg-green-900/50 text-green-400 border border-green-800' : 
                          prompt.category === 'Comparison' ? 'bg-orange-900/50 text-orange-400 border border-orange-800' :
                          'bg-blue-900/50 text-blue-400 border border-blue-800'}`}>
                        {prompt.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {prompt.triggerNetwork ? (
                        <span className="text-cyan-400 flex items-center text-sm"><AlertTriangle className="w-4 h-4 mr-1"/> High</span>
                      ) : (
                        <span className="text-slate-500 text-sm">Low</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {prompt.topSources ? (
                        <div className="flex flex-col gap-2">
                            {prompt.topSources.map((source, i) => (
                                <a 
                                  key={i} 
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center group"
                                  title={source.title}
                                >
                                    <span className="w-4 h-4 rounded-full bg-slate-950 text-[10px] flex items-center justify-center text-slate-500 mr-2 border border-slate-800 group-hover:border-indigo-500 group-hover:text-indigo-400 transition-colors">
                                        {i + 1}
                                    </span>
                                    <span className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline truncate max-w-[140px]">
                                        {source.domain}
                                    </span>
                                    <ExternalLink className="w-3 h-3 ml-1 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                      ) : (
                        <span className="text-slate-600 italic text-xs">Not analyzed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleAnalyze(prompt.id)}
                        disabled={analyzingId === prompt.id || !!prompt.topSources}
                        className="text-sm text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-50 disabled:text-slate-500"
                      >
                        {analyzingId === prompt.id ? 'Analyzing...' : prompt.topSources ? 'Analysis Complete' : 'Analyze Sources'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Radar;