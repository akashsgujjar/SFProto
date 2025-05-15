import { DataParser, ParsedData, ProductionData, DefectData, QualityData, MaintenanceData } from './dataParser';
import { productionData, defectData, qualityData, maintenanceData } from '../data/factoryData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class FactoryApi {
  private static instance: FactoryApi;
  private baseUrl: string;
  private currentData: ParsedData;

  private constructor() {
    this.baseUrl = '/api/factory';
    // Initialize with default data
    this.currentData = {
      production: productionData,
      defects: defectData,
      quality: qualityData,
      maintenance: maintenanceData,
    };
  }

  public static getInstance(): FactoryApi {
    if (!FactoryApi.instance) {
      FactoryApi.instance = new FactoryApi();
    }
    return FactoryApi.instance;
  }

  async uploadData(file: File): Promise<void> {
    const parser = DataParser.getInstance();
    const newData = await parser.parseCSV(file);
    this.currentData = newData;
  }

  async getProductionData(): Promise<ProductionData[]> {
    await delay(500);
    return this.currentData.production;
  }

  async getDefectData(): Promise<DefectData[]> {
    await delay(300);
    return this.currentData.defects;
  }

  async getQualityData(): Promise<QualityData[]> {
    await delay(400);
    return this.currentData.quality;
  }

  async getMaintenanceData(): Promise<MaintenanceData[]> {
    await delay(350);
    return this.currentData.maintenance;
  }

  // Calculate derived metrics
  async getKeyMetrics() {
    await delay(200);
    const production = await this.getProductionData();
    const defects = await this.getDefectData();
    
    const totalProduction = production.reduce((sum, data) => sum + data.units, 0);
    const averageEfficiency = production.reduce((sum, data) => sum + data.efficiency, 0) / production.length;
    const totalDefects = defects.reduce((sum, data) => sum + data.count, 0);
    const averageEnergy = production.reduce((sum, data) => sum + data.energy, 0) / production.length;

    return {
      totalProduction,
      averageEfficiency: Number(averageEfficiency.toFixed(1)),
      totalDefects,
      averageEnergy: Number(averageEnergy.toFixed(1)),
    };
  }

  getCSVTemplate(): string {
    const parser = DataParser.getInstance();
    return parser.generateCSVTemplate();
  }
} 