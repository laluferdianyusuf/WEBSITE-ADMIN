function formatDate(inputDate) {
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  // Ensure it's a valid date
  if (isNaN(date.getTime())) {
    return ""; // Return an empty string or handle as needed
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default formatDate;
