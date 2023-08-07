"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// Sample function to generate SHA-256 hash
async function generateSHA256(text: string) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Function to convert hexadecimal hash to RGB values
function hexToRGB(hash: string, delta = 0) {
  const r = parseInt(hash.slice(0, 2 + delta), 16);
  const g = parseInt(hash.slice(2, 4 + delta), 16);
  const b = parseInt(hash.slice(4, 6 + delta), 16);
  return { r, g, b };
}

const Orb = ({ text, className }: { text: string; className?: string }) => {
  const [gradient, setGradient] = useState(
    "linear-gradient(90deg, #ffffff, #ffffff)"
  );

  useEffect(() => {
    const generateGradient = async () => {
      console.log("text", text);
      const hash = await generateSHA256(text);
      const rgbColor = hexToRGB(hash);

      // Calculate the angle to generate a circular gradient
      const angle = parseInt(hash.slice(-5), 16) % 360;
      const outerRGB = calculateOuterColor(rgbColor, angle);
      console.log("outerRGB", JSON.stringify(outerRGB));

      // Create a circular gradient using the hash-based RGB values
      const gradientValue = `linear-gradient(75deg, rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}), rgb(${outerRGB.r}, ${outerRGB.g}, ${outerRGB.b}))`;
      setGradient(gradientValue);
    };

    generateGradient();
  }, [text]);

  // Function to calculate outer color based on angle and hash
  const calculateOuterColor = (rgbColor: any, angle: number) => {
    const variation = parseInt(((angle / 360) * 200).toFixed()); // Adjust the variation level as needed
    console.log("variation", variation);
    const r = Math.min(255, Math.max(0, rgbColor.r + variation));
    const g = Math.min(255, Math.max(0, rgbColor.g + variation));
    // const b = Math.min(255, Math.max(0, rgbColor.b + variation));
    // const g = rgbColor.g;
    const b = rgbColor.b;
    return { r, g, b };
  };

  // Inline style to set the circular gradient background
  const circleStyle = {
    width: "100px", // Adjust circle size as needed
    height: "100px",
    borderRadius: "50%",
    background: gradient,
  };

  const style = {
    background: gradient,
  };

  return (
    <div
      style={style}
      className={cn("h-10 w-10 rounded-full", className)}
    ></div>
  );
};

export default Orb;
