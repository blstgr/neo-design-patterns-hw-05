import { ReportAdapter } from './ReportAdapter';
import { DirectoryReport } from './DirectoryReport';

export class JsonReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    const formatted = {
      ...report,
      extensions: Object.fromEntries(
          Object.entries(report.extensions).map(([ext, count]) => [ext || '(no extension)', count])
      )
    };
    return JSON.stringify(formatted, null, 2);
  }
}