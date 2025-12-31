import { ProjectData, TabView, ProfileData } from './types';

// ============================================================================
// USER INPUT AREA: Replace the data below with your actual Information
// ============================================================================

export const PROFILE: ProfileData = {
  name: "Thu Hien Nguyen", // Your Name
  role: "Looking for a Working Student position in Data Analytics", // Your Job Title
  linkedinUrl: "https://www.linkedin.com/in/hien-nguyen-thu10/", // Your LinkedIn Profile URL
  // INSTRUCTION: Put your PDF file in the 'public' folder and reference it here
  // Example: if file is public/cv.pdf, put '/cv.pdf'
  cvUrl: "./hien-cv.pdf" 
};

export const PROJECTS: Record<TabView, ProjectData> = {
  [TabView.PROJECT_1]: {
    id: 'youtube-r',
    title: 'Youtube Data Analysis',
    description: 'A comprehensive analysis of Q1-Q4 sales performance, highlighting regional growth and product category dominance.',
    colorTheme: 'blue',
    reportPath: './youtube-r.html', // Path to the PDF report file
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
  {
    "x": "video_views_for_the_last_30_days",
    "y": "avg_monthly_earnings",
    "r": 0.9953,
    "p": 0,
    "stars": "***"
  },
  {
    "x": "avg_monthly_earnings",
    "y": "video_views_for_the_last_30_days",
    "r": 0.9953,
    "p": 0,
    "stars": "***"
  },
  {
    "x": "video_views_mil",
    "y": "subscribers_mil",
    "r": 0.8254,
    "p": 1.621e-245,
    "stars": "***"
  },
  {
    "x": "subscribers_mil",
    "y": "video_views_mil",
    "r": 0.8254,
    "p": 1.2482e-243,
    "stars": "***"
  },
  {
    "x": "unemployment_rate",
    "y": "country_gdp_per_capita_est",
    "r": 0.6692,
    "p": 2.055e-113,
    "stars": "***"
  },
  {
    "x": "country_gdp_per_capita_est",
    "y": "unemployment_rate",
    "r": 0.6692,
    "p": 1.5412e-111,
    "stars": "***"
  },
  {
    "x": "rank",
    "y": "subscribers_mil",
    "r": -0.6504,
    "p": 3.6416e-119,
    "stars": "***"
  },
  {
    "x": "subscribers_mil",
    "y": "rank",
    "r": -0.6504,
    "p": 2.7676e-117,
    "stars": "***"
  },
  {
    "x": "sub_growth_rate_30d",
    "y": "avg_monthly_earnings",
    "r": 0.6074,
    "p": 4.2894e-67,
    "stars": "***"
  },
  {
    "x": "avg_monthly_earnings",
    "y": "sub_growth_rate_30d",
    "r": 0.6074,
    "p": 3.0455e-65,
    "stars": "***"
  },
  {
    "x": "video_views_for_the_last_30_days",
    "y": "sub_growth_rate_30d",
    "r": 0.6065,
    "p": 2.3976e-65,
    "stars": "***"
  },
  {
    "x": "sub_growth_rate_30d",
    "y": "video_views_for_the_last_30_days",
    "r": 0.6065,
    "p": 1.6783e-63,
    "stars": "***"
  },
  {
    "x": "population",
    "y": "country_gdp_per_capita_est",
    "r": -0.5749,
    "p": 3.0941e-77,
    "stars": "***"
  },
  {
    "x": "country_gdp_per_capita_est",
    "y": "population",
    "r": -0.5749,
    "p": 2.2587e-75,
    "stars": "***"
  },
  {
    "x": "video_views_for_the_last_30_days",
    "y": "video_views_mil",
    "r": 0.5519,
    "p": 2.4348e-75,
    "stars": "***"
  },
  {
    "x": "video_views_mil",
    "y": "video_views_for_the_last_30_days",
    "r": 0.5519,
    "p": 1.753e-73,
    "stars": "***"
  },
  {
    "x": "video_views_mil",
    "y": "avg_monthly_earnings",
    "r": 0.5494,
    "p": 1.5425e-78,
    "stars": "***"
  },
  {
    "x": "avg_monthly_earnings",
    "y": "video_views_mil",
    "r": 0.5494,
    "p": 1.1415e-76,
    "stars": "***"
  }
]
  },
  [TabView.PROJECT_2]: {
    id: 'airbnb-price-prediction',
    title: 'Airbnb Price Prediction',
    description: 'Developed machine learning models to predict Airbnb listing prices. Implemented and compared linear regression, regularized (Ridge and Lasso), and non-linear ensemble models (Regression Trees, Bagging, Random Forest, and XGBoost), with Random Forest achieving the best performance based on RMSE.',
    colorTheme: 'purple',
    reportPath: './airbnb-r.html', // Path to the PDF report file
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
    id: 'churn-classification',
    title: 'Classification Models for Customer Churn',
    description: 'Developed machine learning models to predict customer churn in the banking industry. Implemented and compared parametric, semi-parametric, and non-parametric classification models, with CatBoost achieving the best performance based on AUC.',
    colorTheme: 'green',
    reportPath: './churn-py.html', // Path to the PDF report file
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
