import { JsonReportAdapter } from './JsonReportAdapter';
import { CsvReportAdapter } from './CsvReportAdapter';
import { XmlReportAdapter } from './XmlReportAdapter';
import { AnalyzerFacade } from './AnalyzerFacade';
import * as fs from 'fs';
import * as path from 'path';

export class ReportManager {
  private format: string;

  constructor(format: string) {
    this.format = format.toLowerCase();
  }

  generateReport(dirPath: string): void {
    try {
      const adapter = this.getAdapter();
      const facade = new AnalyzerFacade(adapter);
      const reportContent = facade.generateReport(dirPath);

      const reportsDir = path.join(process.cwd(), 'reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir);
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filePath = path.join(reportsDir, `report-${timestamp}.${this.format}`);
      fs.writeFileSync(filePath, reportContent);

      console.log(`Report generated successfully: ${filePath}`);
    } catch (error) {
      console.error(`Error generating report: ${(error as Error).message}`);
    }
  }

  private getAdapter() {
    switch (this.format) {
      case 'json':
        return new JsonReportAdapter();
      case 'csv':
        return new CsvReportAdapter();
      case 'xml':
        return new XmlReportAdapter();
      default:
        throw new Error(`Unsupported format: ${this.format}`);
    }
  }
}