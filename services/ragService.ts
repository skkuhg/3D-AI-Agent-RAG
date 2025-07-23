
export interface SearchResult {
  url: string;
  content: string;
  title?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

class RAGService {
  private tavilyApiKey: string;
  private openaiApiKey: string;

  constructor(tavilyApiKey: string, openaiApiKey: string) {
    this.tavilyApiKey = tavilyApiKey;
    this.openaiApiKey = openaiApiKey;
  }

  async searchTavily(query: string, maxResults: number = 3): Promise<SearchResult[]> {
    try {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.tavilyApiKey,
          query: query,
          search_depth: 'basic',
          include_answer: true,
          max_results: maxResults,
          include_domains: [],
          exclude_domains: []
        })
      });
      
      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Tavily search error:', error);
      return [];
    }
  }

  async generateResponse(
    userMessage: string, 
    searchResults: SearchResult[],
    conversationHistory: ChatMessage[] = []
  ): Promise<string> {
    try {
      const context = searchResults
        .map(result => `Source: ${result.title || result.url}\nContent: ${result.content}`)
        .join('\n\n');

      const systemMessage: ChatMessage = {
        role: 'system',
        content: `You are a helpful AI assistant with access to current web information through retrieval-augmented generation (RAG). 

Use the following context from recent web search results to provide accurate, up-to-date information. If the context contains relevant information, prioritize it in your response. If the context doesn't contain relevant information, provide a helpful response based on your training data and clearly indicate when you're using general knowledge vs. current web data.

Always be conversational, helpful, and cite sources when using information from the search results.

Current web search context:
${context || 'No relevant web search results found for this query.'}
`
      };

      const messages: ChatMessage[] = [
        systemMessage,
        ...conversationHistory.slice(-6), // Keep last 6 messages for context
        { role: 'user', content: userMessage }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messages,
          max_tokens: 800,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'I apologize, but there was an error processing your request. Please try again.';
    }
  }

  async processQuery(
    userMessage: string, 
    conversationHistory: ChatMessage[] = []
  ): Promise<{ response: string; sources: SearchResult[] }> {
    // Search for relevant information
    const searchResults = await this.searchTavily(userMessage);
    
    // Generate AI response with RAG
    const response = await this.generateResponse(userMessage, searchResults, conversationHistory);
    
    return {
      response,
      sources: searchResults
    };
  }
}

export default RAGService;
