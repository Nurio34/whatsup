"use client";

import { useEffect, useRef, useState } from "react";

function Ping() {
  const [lastPing, setLastPing] = useState(0);

  const ErrorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const LoopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const Nine_Minutes = 1000 * 60 * 9;

  const pingServer = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
      const response = await fetch(`${url}/ping`);

      if (ErrorTimeoutRef.current) {
        clearTimeout(ErrorTimeoutRef.current);
      }

      if (!response.ok) {
        ErrorTimeoutRef.current = setTimeout(() => {
          pingServer();
        }, 1000);
        return;
      }

      const status = await response.text();

      if (status === "error") {
        ErrorTimeoutRef.current = setTimeout(() => {
          pingServer();
        }, 1000);
        return;
      } else {
        const pingTime = new Date().getTime();
        setLastPing(pingTime);
      }
    } catch (error) {
      console.log(`Unexpected error : ${error}`);
      ErrorTimeoutRef.current = setTimeout(() => {
        pingServer();
      }, 1000);
    }
  };

  useEffect(() => {
    pingServer();

    return () => {
      if (ErrorTimeoutRef.current) {
        clearTimeout(ErrorTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (LoopTimeoutRef.current) {
      clearInterval(LoopTimeoutRef.current);
    }

    if (lastPing > 0) {
      LoopTimeoutRef.current = setInterval(() => {
        const now = new Date().getTime();
        const timeDiff = now - lastPing;

        if (timeDiff >= Nine_Minutes) {
          pingServer();
          setLastPing(now);
        }
      }, 1000 * 30);
    }

    return () => {
      if (LoopTimeoutRef.current) {
        clearInterval(LoopTimeoutRef.current);
      }
    };
  }, [lastPing]);

  return <div></div>;
}
export default Ping;
