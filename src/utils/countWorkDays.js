import { isHoliday } from "./holydays";

const countWorkdays = (start, end) => {
  let count = 0;
  let current = new Date(start);

  while (current <= end) {
    const dayOfWeek = current.getUTCDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};


export default countWorkdays;