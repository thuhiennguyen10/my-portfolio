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

export interface ScatterPlotData {
  points: ScatterPoint[];
  line: ScatterPoint[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  colorTheme: 'blue' | 'purple' | 'green' | 'rose';
  projectSummary: string; // Project summary for all 3 projects
  layoutType?: 'default' | 'summary' | 'detailed'; // Layout control
  chartDataMain: DataPoint[]; // Column/Line
  chartDataDistribution: DataPoint[]; // Pie/Donut 
  chartDataSecondary?: DataPoint[]; // Other graph types
  scatterData?: any[]; 
  tableTitle?: string;
  tableData: any[];
  reportPath?: string;  // Path to the code file

scatterData1?: ScatterPlotData;
scatterData2?: ScatterPlotData;
scatterData3?: ScatterPlotData;
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
