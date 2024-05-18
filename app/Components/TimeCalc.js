import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, parseISO } from 'date-fns';

const CountdownComponent = ({ constantDate }) => {
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateDifference = () => {
      const parsedConstantDate = parseISO(constantDate);
      const currentDate = new Date();
      const daysDifference = differenceInDays(parsedConstantDate, currentDate);
      const hoursDifference = differenceInHours(parsedConstantDate, currentDate) % 24;
      const minutesDifference = differenceInMinutes(parsedConstantDate, currentDate) % 60;
      const secondsDifference = differenceInSeconds(parsedConstantDate, currentDate) % 60;

      setTimeDifference({
        days: daysDifference,
        hours: hoursDifference,
        minutes: minutesDifference,
        seconds: secondsDifference,
      });
    };

    // Update the difference immediately
    updateDifference();

    // Set up an interval to update the difference every second
    const intervalId = setInterval(updateDifference, 1000); // 1000ms = 1 second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [constantDate]); // Ensure useEffect only runs when constantDate changes

  return (
    <div>
      <p>
        {timeDifference.days}:{timeDifference.hours}:{timeDifference.minutes}:{timeDifference.seconds}
      </p>
    </div>
  );
};

export default CountdownComponent;