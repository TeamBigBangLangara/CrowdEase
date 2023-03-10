export const getDate= () => {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const firstDay = new Date(curr.setDate(first));
  const lastDay = new Date(curr.setDate(last));

  const options = { month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;

  const formattedFirstDay = firstDay.toLocaleDateString('en-US', options);
  const formattedLastDay = lastDay.toLocaleDateString('en-US', options);
  const today = new Date().toLocaleDateString('en-US', options);

  return { formattedFirstDay, formattedLastDay, today };
};


