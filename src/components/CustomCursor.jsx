// Importing React hooks
import { useEffect, useState } from "react";

export default function CustomCursor() {
  // Store mouse position (x, y) in local state
  // By default, it starts at { x: 0, y: 0 }
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // useEffect runs once when component mounts
  useEffect(() => {
    // Function to update cursor position whenever mouse moves
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", moveHandler);

    // Cleanup → remove event listener when component unmounts
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <div
      // pointer-events-none → ensures this custom cursor does NOT block clicks
      // fixed + top-0 + left-0 → always pinned to top-left
      // z-[9999] → ensures it stays above everything
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        // Move the div to match current mouse position
        // -40px centers the cursor since the circle size = 80px (20rem/2)
        transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,

        // Adds smooth movement animation for cursor trail
        transition: "transform 0.05s linear",
      }}
    >
      {/* The glowing circle */}
      <div
        className="w-20 h-20 rounded-full 
                   bg-gradient-to-r from-pink-500 to-blue-500 
                   blur-3xl opacity-80"
      />
    </div>
  );
}
