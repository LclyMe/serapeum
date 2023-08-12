"use client";

import React, { useState, useEffect } from "react";
import "./SpinningIcon.css"; // Import or define CSS file for the spinning animation
import LclyLogo from "../LclyLogo";

const SpinningIcon = () => {
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    // Disable the spinning after a delay
    const timeout = setTimeout(() => {
      setSpin(false);
    }, 600); // Adjust the delay (milliseconds) to your desired lead-in time

    // Clean up the timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const spinStart = windowHeight * 0.05; // Start scroll offset
    const spinEnd = windowHeight * 0.4; // End sroll offset

    setSpin(scrollY >= spinStart && scrollY <= spinEnd);
  };

  useEffect(() => {
    // Add a scroll event listener to resume spinning when scrolled down
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LclyLogo
      className={`${
        spin ? "spinning-icon" : ""
      } text-black dark:text-white h-[75px] w-[75px]`}
    />
  );
};

export default SpinningIcon;
