export function formatDateToMonthYear(dateString) {
  const dateObj = new Date(dateString); // Convert string to Date object
  // Get the month and year
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const year = dateObj.getFullYear();

  return `${month} /${year}`; // Return in MM/YYYY format
}
