import React, {useState} from 'react'

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

    const transition = (myMode, replace = false) => {
    
      if (replace) {
        setHistory((prev) => [...prev.slice(0, - 1), myMode]);
      } else {
        setHistory((prev) => [...prev, myMode]);
        
      }
      setMode(myMode);
    };


  const back = () => {
    setHistory((prev) => {
      if (prev.length === 1) {
        return [...prev];
      }

      const lastMode = [...prev.slice(0, -1)];
      setMode(lastMode[lastMode.length - 1]);
      return lastMode;

    });
  };
  
  return { mode, transition, back };
};