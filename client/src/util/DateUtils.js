class DateUtils {
    static getCurrentMonth() {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const currentDate = new Date();
      return months[currentDate.getMonth()];
    }
  
    static getCurrentYear() {
      const currentDate = new Date();
      return currentDate.getFullYear();
    }
  
    static getCurrentDate() {
      const currentDate = new Date();
      const date = currentDate.getDate();
      const month = this.getCurrentMonth();
      const year = this.getCurrentYear();
      const formattedDate = `${date}${this.getOrdinalSuffix(date)} ${month}, ${year}`;
      return formattedDate;
    }
  
    static getOrdinalSuffix(date) {
      if (date >= 11 && date <= 13) {
        return 'th';
      }
      switch (date % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }
  }
  
  export default DateUtils;
  