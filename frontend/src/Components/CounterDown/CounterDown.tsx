import { useState, useEffect, memo, FC } from 'react';

interface CounterDownProps {
  className?: string;
  time: string;
  showFullFormat?: boolean; 
}

const CounterDown: FC<CounterDownProps> = ({ className, time, showFullFormat = true }) => {
  const [timerDays, setTimerDays] = useState<string>('');
  const [timerHours, setTimerHours] = useState<string>('');
  const [timerMinutes, setTimerMinutes] = useState<string>('');
  const [timerSeconds, setTimerSeconds] = useState<string>('');

  useEffect(() => {
    const countDownDate = new Date(time).getTime();

    let interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      let days = Math.floor(distance / (24 * 60 * 60 * 1000)).toString();
      let hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)).toString();
      let minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60)).toString();
      let seconds = Math.floor((distance % (60 * 1000)) / 1000).toString();

      days = days.padStart(2, '0');
      hours = hours.padStart(2, '0');
      minutes = minutes.padStart(2, '0');
      seconds = seconds.padStart(2, '0');

      setTimerDays(days);
      setTimerHours(hours);

      if (showFullFormat) {
        // نمایش کامل اطلاعات
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      } else {
        // نمایش فقط دقیقه و ثانیه
        setTimerMinutes(`${minutes}`);
        setTimerSeconds(`${seconds}`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time, showFullFormat]);

  return (
    <span className={`cart__info-value ${className || ''}`}>
      {showFullFormat && `${timerDays}:`}
      {showFullFormat && `${timerHours}:`}
      {timerMinutes}:{timerSeconds}
    </span>
  );
};

export default memo(CounterDown);
