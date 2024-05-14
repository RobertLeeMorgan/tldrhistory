export default function formatDate(dateString) {
    // Split the date string by '-'
    const parts = dateString.split("-");

    let year, month, day;

    // Check if the dateString starts with a minus sign for BCE years
    if (dateString.startsWith("-")) {
      year = parts[1];
      month = parts[2];
      day = parts[3];
      year = Math.abs(year) + " BCE";
    } else {
      year = parts[0];
      month = parts[1];
      day = parts[2];
      year = Math.abs(year) + " CE";
    }

    // Adding leading zeros if necessary to ensure the correct format
    year = year.padStart(4, "0");
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");

    if (day === "00" && month === "00") {
      return year;
    }

    // Convert month number to month name
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    month = months[parseInt(month) - 1];

    if (day === "00") {
      return `${month} ${year}`;
    }

    // Constructing the formatted date string
    const formatDate = `${day} ${month} ${year}`;

    return formatDate;
  }
