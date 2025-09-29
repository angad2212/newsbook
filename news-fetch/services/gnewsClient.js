import axios from 'axios';
import { config } from '../config.js';

class GNewsClient {
  constructor() {
    this.apiKey = config.gnews.apiKey;
    this.baseUrl = config.gnews.baseUrl;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Build query parameters for GNews API
   */
  buildQueryParams(options = {}) {
    const params = new URLSearchParams();
    
    // Required API key
    params.append('apikey', this.apiKey);
    
    // Optional parameters
    if (options.category) params.append('category', options.category);
    if (options.country) params.append('country', options.country);
    if (options.language) params.append('language', options.language);
    if (options.keywords) params.append('q', options.keywords);
    if (options.from) params.append('from', options.from);
    if (options.to) params.append('to', options.to);
    if (options.sortBy) params.append('sortby', options.sortBy);
    if (options.max) params.append('max', options.max);
    
    return params.toString();
  }

  /**
   * Fetch news by category
   */
  async fetchByCategory(category, options = {}) {
    try {
      const params = this.buildQueryParams({
        category,
        ...options
      });
      
      const response = await this.client.get(`/top-headlines?${params}`);
      return this.transformResponse(response.data);
    } catch (error) {
      console.error('Error fetching news by category:', error);
      throw new Error(`Failed to fetch news for category: ${category}`);
    }
  }

  /**
   * Fetch news by keywords
   */
  async fetchByKeywords(keywords, options = {}) {
    try {
      const params = this.buildQueryParams({
        keywords,
        ...options
      });
      
      const response = await this.client.get(`/search?${params}`);
      return this.transformResponse(response.data);
    } catch (error) {
      console.error('Error fetching news by keywords:', error);
      throw new Error(`Failed to fetch news for keywords: ${keywords}`);
    }
  }

  /**
   * Fetch news with custom parameters
   */
  async fetchNews(options = {}) {
    try {
      const params = this.buildQueryParams(options);
      const endpoint = options.keywords ? '/search' : '/top-headlines';
      
      const response = await this.client.get(`${endpoint}?${params}`);
      return this.transformResponse(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch news');
    }
  }

  /**
   * Transform GNews API response to our format
   */
  transformResponse(data) {
    const { articles = [], totalArticles = 0 } = data;
    
    const transformedArticles = articles.map(article => ({
      id: article.id || this.generateId(article.title),
      title: article.title || '',
      description: article.description || '',
      content: article.content || '',
      url: article.url || '',
      imageUrl: article.image || '',
      publishedAt: article.publishedAt || '',
      language: article.lang || 'en',
      source: {
        id: article.source?.id || '',
        name: article.source?.name || '',
        url: article.source?.url || '',
        country: article.source?.country || ''
      },
      tags: this.extractTags(article)
    }));

    return {
      articles: transformedArticles,
      totalArticles,
      success: true
    };
  }

  /**
   * Extract tags from article content
   */
  extractTags(article) {
    const tags = [];
    
    // Add category if available
    if (article.category) {
      tags.push(article.category);
    }
    
    // Extract potential tags from title and description
    const text = `${article.title} ${article.description}`.toLowerCase();
    
    // Common news categories/topics
    const commonTags = [
      'technology', 'business', 'politics', 'sports', 'health', 'science',
      'entertainment', 'world', 'economy', 'finance', 'ai', 'climate',
      'education', 'travel', 'food', 'lifestyle'
    ];
    
    commonTags.forEach(tag => {
      if (text.includes(tag)) {
        tags.push(tag);
      }
    });
    
    return [...new Set(tags)]; // Remove duplicates
  }

  /**
   * Generate ID from title if not provided
   */
  generateId(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  /**
   * Get available categories
   */
  getCategories() {
    return [
      'general', 'world', 'nation', 'business', 'technology',
      'entertainment', 'sports', 'science', 'health', 'food'
    ];
  }

  /**
   * Get available countries
   */
  getCountries() {
    return [
      'us', 'gb', 'au', 'ca', 'in', 'ie', 'nz', 'za', 'ng', 'gh', 'ke',
      'eg', 'ma', 'dz', 'tn', 'ly', 'sd', 'et', 'ug', 'tz', 'mw', 'zm',
      'zw', 'bw', 'na', 'sz', 'ls', 'mg', 'mu', 'sc', 're', 'yt', 'km',
      'dj', 'so', 'er', 'ss', 'cf', 'td', 'ne', 'bf', 'ml', 'sn', 'gm',
      'gn', 'gw', 'sl', 'lr', 'ci', 'gh', 'tg', 'bj', 'ng', 'cm', 'td',
      'cf', 'cg', 'cd', 'ao', 'zm', 'zw', 'bw', 'na', 'sz', 'ls', 'za',
      'mg', 'mu', 'sc', 're', 'yt', 'km', 'dj', 'so', 'er', 'ss', 'cf',
      'td', 'ne', 'bf', 'ml', 'sn', 'gm', 'gn', 'gw', 'sl', 'lr', 'ci',
      'gh', 'tg', 'bj', 'ng', 'cm', 'td', 'cf', 'cg', 'cd', 'ao', 'zm',
      'zw', 'bw', 'na', 'sz', 'ls', 'za', 'mg', 'mu', 'sc', 're', 'yt',
      'km', 'dj', 'so', 'er', 'ss', 'cf', 'td', 'ne', 'bf', 'ml', 'sn',
      'gm', 'gn', 'gw', 'sl', 'lr', 'ci', 'gh', 'tg', 'bj', 'ng', 'cm',
      'td', 'cf', 'cg', 'cd', 'ao', 'zm', 'zw', 'bw', 'na', 'sz', 'ls',
      'za', 'mg', 'mu', 'sc', 're', 'yt', 'km', 'dj', 'so', 'er', 'ss',
      'cf', 'td', 'ne', 'bf', 'ml', 'sn', 'gm', 'gn', 'gw', 'sl', 'lr',
      'ci', 'gh', 'tg', 'bj', 'ng', 'cm', 'td', 'cf', 'cg', 'cd', 'ao'
    ];
  }
}

export default GNewsClient;
