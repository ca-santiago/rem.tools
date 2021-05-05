import { useEffect, useState } from "react";

export default function useTimer() {
  
  const [time, setTime] = useState(0);
  let timeout = undefined;

  useEffect(()=> {
    return () => {
      console.log('Cleaning');
      clearTimeout(timeout);
    }
  }, []);

  function start() {
    timeout = setTimeout(()=> {
      setTime(prev => prev + 1);
    }, 1000);
  }

  function stop() {
    clearTimeout(timeout);
  }

  function resetTime() {
    stop();
    setTime(0);
  }


  return {
    time,
    resetTime,
    stop,
    start,
  };
};