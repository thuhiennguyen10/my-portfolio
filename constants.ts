import { ProjectData, TabView, ProfileData } from './types';

// ============================================================================
// USER INPUT AREA: Replace the data below with your actual Information
// ============================================================================

export const PROFILE: ProfileData = {
  name: "Thu Hien Nguyen", // Your Name
  role: "Working Student in Data Analytics", // Your Job Title
  linkedinUrl: "https://www.linkedin.com/in/hien-nguyen-thu10/", // Your LinkedIn Profile URL
  // INSTRUCTION: Put your PDF file in the 'public' folder and reference it here
  // Example: if file is public/cv.pdf, put '/cv.pdf'
  cvUrl: "./hien-cv.pdf" 
};

export const PROJECTS: Record<TabView, ProjectData> = {
  [TabView.PROJECT_1]: {
    id: 'ecommerce-growth',
    title: 'E-Commerce Sales Growth',
    description: 'A comprehensive analysis of Q1-Q4 sales performance, highlighting regional growth and product category dominance.',
    colorTheme: 'blue',
    kpis: [
      { label: 'Total Revenue', value: '$4.2M', trend: 'up', percentage: '+12.5%' },
      { label: 'Active Users', value: '45.2K', trend: 'up', percentage: '+8.3%' },
      { label: 'Churn Rate', value: '2.1%', trend: 'down', percentage: '-0.5%' },
    ],
    chartDataMain: [
      { name: 'Jan', value: 4000, secondaryValue: 2400 },
      { name: 'Feb', value: 3000, secondaryValue: 1398 },
      { name: 'Mar', value: 2000, secondaryValue: 9800 },
      { name: 'Apr', value: 2780, secondaryValue: 3908 },
      { name: 'May', value: 1890, secondaryValue: 4800 },
      { name: 'Jun', value: 2390, secondaryValue: 3800 },
      { name: 'Jul', value: 3490, secondaryValue: 4300 },
    ],
    chartDataDistribution: [
      { name: 'Electronics', value: 400 },
      { name: 'Fashion', value: 300 },
      { name: 'Home', value: 300 },
      { name: 'Sports', value: 200 },
    ],
    tableData: [
      { id: 1, region: 'North America', sales: '$1,200,000', leads: 5000, conversion: '24%' },
      { id: 2, region: 'Europe', sales: '$980,000', leads: 4200, conversion: '21%' },
      { id: 3, region: 'Asia Pacific', sales: '$1,500,000', leads: 6800, conversion: '18%' },
      { id: 4, region: 'Latin America', sales: '$520,000', leads: 2100, conversion: '15%' },
    ]
  },
  [TabView.PROJECT_2]: {
    id: 'marketing-campaign',
    title: 'Marketing Campaign ROI',
    description: 'Evaluation of the "Summer Vibes" marketing campaign across social media channels and email marketing.',
    colorTheme: 'purple',
    kpis: [
      { label: 'Ad Spend', value: '$150K', trend: 'neutral', percentage: '0%' },
      { label: 'Impressions', value: '2.4M', trend: 'up', percentage: '+22%' },
      { label: 'CTR', value: '3.4%', trend: 'up', percentage: '+1.2%' },
    ],
    chartDataMain: [
      { name: 'Week 1', value: 120, secondaryValue: 100 },
      { name: 'Week 2', value: 132, secondaryValue: 110 },
      { name: 'Week 3', value: 101, secondaryValue: 120 },
      { name: 'Week 4', value: 134, secondaryValue: 140 },
      { name: 'Week 5', value: 190, secondaryValue: 160 },
      { name: 'Week 6', value: 230, secondaryValue: 180 },
    ],
    chartDataDistribution: [
      { name: 'Instagram', value: 45 },
      { name: 'TikTok', value: 35 },
      { name: 'Facebook', value: 10 },
      { name: 'Email', value: 10 },
    ],
    tableData: [
      { id: 1, channel: 'Instagram', spend: '$50,000', roi: '3.2x', clicks: '450K' },
      { id: 2, channel: 'TikTok', spend: '$40,000', roi: '4.5x', clicks: '600K' },
      { id: 3, channel: 'Facebook', spend: '$30,000', roi: '1.8x', clicks: '120K' },
      { id: 4, channel: 'Email', spend: '$10,000', roi: '8.0x', clicks: '80K' },
    ]
  },
  [TabView.PROJECT_3]: {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction Index',
    description: 'Year-over-year analysis of customer support tickets, resolution times, and NPS scores.',
    colorTheme: 'green',
    kpis: [
      { label: 'NPS Score', value: '72', trend: 'up', percentage: '+5pts' },
      { label: 'Avg Resolution', value: '4.2h', trend: 'down', percentage: '-15%' },
      { label: 'Ticket Vol', value: '1.2K', trend: 'neutral', percentage: '-2%' },
    ],
    chartDataMain: [
      { name: 'Q1', value: 65, secondaryValue: 40 },
      { name: 'Q2', value: 68, secondaryValue: 35 },
      { name: 'Q3', value: 70, secondaryValue: 30 },
      { name: 'Q4', value: 72, secondaryValue: 28 },
    ],
    chartDataDistribution: [
      { name: 'Promoters', value: 60 },
      { name: 'Passives', value: 30 },
      { name: 'Detractors', value: 10 },
    ],
    tableData: [
      { id: 1, type: 'Technical', volume: 450, avg_time: '5h', satisfaction: '4.8/5' },
      { id: 2, type: 'Billing', volume: 300, avg_time: '2h', satisfaction: '4.2/5' },
      { id: 3, type: 'Feature Req', volume: 150, avg_time: '24h', satisfaction: '4.9/5' },
      { id: 4, type: 'General', volume: 300, avg_time: '1h', satisfaction: '4.5/5' },
    ]
  },
};
