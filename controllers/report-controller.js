import ReportDto from "../dto/report-dto.js";
import ReportService from "../services/report-service.js";

class ReportController {
  async createReport(req, res, next) {
    try {
      const { emojis, comment } = req.body;
      const userId = req.user.id;
      const report = await ReportService.createReport(userId, emojis, comment);
      const reportDto = new ReportDto(report);
      return res.json({ ...reportDto });
    } catch (e) {
      next(e);
    }
  }

  async readReports(req, res, next) {
    try {
      const userId = req.user.id;
      const reports = await ReportService.readReports(userId);
      const reportsDto = reports.map((report) => ({
        ...new ReportDto(report),
      }));
      return res.json(reportsDto);
    } catch (e) {
      next(e);
    }
  }
}

export default new ReportController();
