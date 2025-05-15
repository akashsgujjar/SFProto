import Papa from 'papaparse';

export interface ParsedData {
  production: ProductionData[];
  defects: DefectData[];
  quality: QualityData[];
  maintenance: MaintenanceData[];
}

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

export class DataParser {
  private static instance: DataParser;

  private constructor() {}

  public static getInstance(): DataParser {
    if (!DataParser.instance) {
      DataParser.instance = new DataParser();
    }
    return DataParser.instance;
  }

  async parseCSV(file: File): Promise<ParsedData> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          try {
            const data = this.processCSVData(results.data);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        },
        header: true,
      });
    });
  }

  private processCSVData(data: any[]): ParsedData {
    // Initialize empty arrays for each data type
    const production: ProductionData[] = [];
    const defects: DefectData[] = [];
    const quality: QualityData[] = [];
    const maintenance: MaintenanceData[] = [];

    // Process each row based on its type
    data.forEach((row) => {
      switch (row.type?.toLowerCase()) {
        case 'production':
          production.push({
            time: row.time,
            units: Number(row.units),
            efficiency: Number(row.efficiency),
            energy: Number(row.energy),
          });
          break;
        case 'defect':
          defects.push({
            category: row.category,
            count: Number(row.count),
          });
          break;
        case 'quality':
          quality.push({
            name: row.name,
            value: Number(row.value),
          });
          break;
        case 'maintenance':
          maintenance.push({
            date: row.date,
            preventive: Number(row.preventive),
            corrective: Number(row.corrective),
          });
          break;
      }
    });

    return { production, defects, quality, maintenance };
  }

  // Helper method to generate a sample CSV template
  generateCSVTemplate(): string {
    const headers = [
      'type,time,units,efficiency,energy',
      'type,category,count',
      'type,name,value',
      'type,date,preventive,corrective',
    ].join('\n');

    const examples = [
      'production,00:00,45,92,85',
      'defect,Assembly,12',
      'quality,Excellent,65',
      'maintenance,Mon,4,1',
    ].join('\n');

    return `${headers}\n${examples}`;
  }
} 