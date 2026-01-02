export interface DataPoint {
  name: string;
  value: number;
  secondaryValue?: number; // Optional for multi-line charts
  category?: string;
}

export interface ScatterPoint {
  x: number;
  y: number;
}

export interface ScatterPlotData { // Scatter plot data structure
  points: ScatterPoint[];
  line: ScatterPoint[];
}

export interface FacetDataPoint { // TD-IDF data structure
  channel_type: string;
  word: string;
  tf_idf: number;
}

export interface BoxPlotDataPoint { // Box plot data structure
  name: string;
  low: number;
  q1: number;
  median: number;
  q3: number;
  high: number;
  outliers: number[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  colorTheme: 'blue' | 'purple' | 'green' | 'rose';
  projectSummary: string; // Project summary for all 3 projects
  layoutType?: 'default' | 'summary' | 'detailed'; // Layout control
  chartDataDistribution: DataPoint[]; // Pie/Donut 
  chartDataSecondary?: DataPoint[] ; // Other graph types
  scatterData?: any[]; 
  tableTitle?: string;
  tableData: any[];
  reportPath?: string;  // Path to the code file

scatterData1?: ScatterPlotData;
scatterData2?: ScatterPlotData;
scatterData3?: ScatterPlotData;
chartDataMain: DataPoint[]; // Continent
tfidfData?: FacetDataPoint[]; // TF-IDF
aucData?: DataPoint[]; // AUC Comparison
boxplotData?: BoxPlotDataPoint[]; // Box Plot
}

export interface ProfileData {
  name: string;
  role: string;
  linkedinUrl: string;
  cvUrl: string; // Path to the PDF file (e.g., "/my-cv.pdf")
}

export enum TabView {
  PROJECT_AIRBNB = 'project-airbnb',
  PROJECT_YOUTUBE = 'project-youtube',
  PROJECT_CHURN = 'project-churn'
}
