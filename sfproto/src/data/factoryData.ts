export interface ProductionData {
  time: string;
  units: number;
  efficiency: number;
  energy: number;
}

export interface DefectData {
  category: string;
  count: number;
}

export interface QualityData {
  name: string;
  value: number;
}

export interface MaintenanceData {
  date: string;
  preventive: number;
  corrective: number;
}

export const productionData: ProductionData[] = [
  { time: '00:00', units: 45, efficiency: 92, energy: 85 },
  { time: '04:00', units: 38, efficiency: 88, energy: 82 },
  { time: '08:00', units: 52, efficiency: 95, energy: 90 },
  { time: '12:00', units: 48, efficiency: 90, energy: 88 },
  { time: '16:00', units: 55, efficiency: 94, energy: 92 },
  { time: '20:00', units: 42, efficiency: 89, energy: 84 },
];

export const defectData: DefectData[] = [
  { category: 'Assembly', count: 12 },
  { category: 'Welding', count: 8 },
  { category: 'Painting', count: 5 },
  { category: 'Testing', count: 3 },
];

export const qualityData: QualityData[] = [
  { name: 'Excellent', value: 65 },
  { name: 'Good', value: 25 },
  { name: 'Average', value: 7 },
  { name: 'Poor', value: 3 },
];

export const maintenanceData: MaintenanceData[] = [
  { date: 'Mon', preventive: 4, corrective: 1 },
  { date: 'Tue', preventive: 3, corrective: 2 },
  { date: 'Wed', preventive: 5, corrective: 0 },
  { date: 'Thu', preventive: 4, corrective: 1 },
  { date: 'Fri', preventive: 3, corrective: 2 },
]; 