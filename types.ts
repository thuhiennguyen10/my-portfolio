export interface DataPoint {
  name: string;
  value: number;
  secondaryValue?: number; // Optional for multi-line charts
  category?: string;
}

export interface KPI {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  percentage: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  colorTheme: 'blue' | 'purple' | 'green' | 'rose';
  kpis: KPI[];
  chartDataMain: DataPoint[]; // Main Trend
  chartDataDistribution: DataPoint[]; // Pie/Donut
  tableData: any[];
  reportPath?: string;  // Path to the PDF report file
}

export interface ProfileData {
  name: string;
  role: string;
  linkedinUrl: string;
  cvUrl: string; // Path to the PDF file (e.g., "/my-cv.pdf")
}

export enum TabView {
  PROJECT_1 = 'PROJECT_1',
  PROJECT_2 = 'PROJECT_2',
  PROJECT_3 = 'PROJECT_3'
}
