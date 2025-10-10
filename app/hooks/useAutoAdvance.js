import { useEffect, useRef } from "react";

export default function useAutoAdvance({ trigger, delay = 2000, onAdvance }) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    // Starta timer
    timeoutRef.current = setTimeout(() => {
      onAdvance();
    }, delay);

    // Funktion för att hoppa över
    const skip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        onAdvance();
      }
    };

    // Lyssna på mellanslag
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        skip();
      }
    };

    // Lyssna på klick
    const handleClick = () => {
      skip();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    // Städa upp
    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [trigger, delay, onAdvance]);
}
