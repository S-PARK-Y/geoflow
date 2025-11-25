export enum PromptCategory {
  DEFINITION = 'Definition',
  COMPARISON = 'Comparison',
  LISTICLE = 'Listicle',
  SOLUTION = 'Solution',
}

export enum SourceType {
  ZHIHU = 'Zhihu',
  CSDN = 'CSDN',
  OFFICIAL_SITE = 'Official Site',
  MEDIA_36KR = '36Kr',
  OTHERS = 'Others',
}

export interface Source {
  domain: string;
  url: string;
  title: string;
  type: SourceType;
}

export interface PromptItem {
  id: string;
  text: string;
  category: PromptCategory;
  triggerNetwork: boolean; // Does it trigger AI search/networking?
  topSources?: Source[];
  lastChecked?: string;
}

export interface ContentBrief {
  id: string;
  targetPromptId: string;
  targetPromptText: string;
  productName: string;
  productData: string; // JSON string or text block for context
  generatedContent: string;
  status: 'draft' | 'published';
  channel?: 'Zhihu' | 'Official' | 'Toutiao';
}

export interface InsightMetric {
  date: string;
  shareOfVoice: number; // AISOV percentage
  positiveSentiment: number; // 0-100
  mentions: number;
}