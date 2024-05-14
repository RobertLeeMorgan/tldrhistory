import { useState } from 'react';

// Custom hook for handling date inputs and calculating max days in the month
function useDateInputs(initialValues) {
  const [dateInputs, setDateInputs] = useState({
    start_year: '',
    start_month: '',
    start_day: '',
    end_year: '',
    end_month: '',
    end_day: '',
    ...initialValues
  });

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateInputs(prevState => ({ ...prevState, [name]: value }));

    // Calculate and update max days in the month
    if (name.includes('year') || name.includes('month')) {
      const prefix = name.includes('start') ? 'start' : 'end';
      const year = parseInt(dateInputs[`${prefix}_year`]);
      const month = parseInt(dateInputs[`${prefix}_month`]);
      let maxDays = new Date(year, month, 0).getDate();

      // Handling the transition from Julian to Gregorian calendar
      if (year === 1582 && month === 10) {
        // October 1582 had 21 days under the Julian calendar, but only 10 under the Gregorian calendar
        maxDays = 10;
      } else if (year > 1582 || (year === 1582 && month > 10)) {
        // Dates after the transition year (1582) follow the Gregorian calendar
        maxDays = new Date(year, month, 0).getDate();
      }

      setDateInputs(prevState => ({
        ...prevState,
        [`${prefix}_day`]: Math.min(prevState[`${prefix}_day`], maxDays)
      }));
    }
  };

  return [dateInputs, handleDateChange];
}

export default useDateInputs;