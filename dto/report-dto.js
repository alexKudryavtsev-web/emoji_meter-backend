class ReportDto {
  emojis;
  comment;
  date;
  id;

  constructor(model) {
    this.emojis = model.emojis;
    this.comment = model.comment;
    this.date = model.date;
    this.id = model._id;
  }
}

export default ReportDto;
