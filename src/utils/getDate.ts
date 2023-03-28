export const getDate = () => {
  const curr = new Date(); // get current date
  const dayOfWeek = curr.getDay(); // Sunday is 0, Monday is 1, and so on.
  const monday = new Date(curr);
  monday.setDate(curr.getDate() - dayOfWeek + 1); // Subtract days to get to Monday of current week.
  const firstDay = new Date(monday); // create new date object for the first day
  const lastDay = new Date(monday); // create new date object for the last day
  lastDay.setDate(monday.getDate() + 6); // set last day by adding 6 days to the first day

  const options = { month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
  const formattedFirstDay = firstDay.toLocaleDateString('en-US', options);
  const formattedLastDay = lastDay.toLocaleDateString('en-US', options);
  const today = new Date().toLocaleDateString('en-US', options);

  const week: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed.
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed.
    const formattedDate = `${year}-${month}-${day}`;
    week.push(formattedDate);
  }

  return { formattedFirstDay, formattedLastDay, today, week };
};
