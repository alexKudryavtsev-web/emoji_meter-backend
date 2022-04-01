import ApiError from "../errors/api-error.js";
import ReportModel from "../models/report-model.js";

class ReportService {
  async createReport(userId, emojis, comment) {
    if (!emojis) {
      throw ApiError.BadRequest("not enough input");
    }
    const newReport = await ReportModel.create({
      userId,
      emojis,
      comment,
      date: Date.now(),
    });
    return newReport;
  }

  async readReports(userId) {
    const reports = await ReportModel.find();
    return reports.filter((report) => report.userId.toString() === userId);
  }
}

export default new ReportService();
