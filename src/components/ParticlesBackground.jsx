import { useEffect, useRef } from "react"; // Import React hooks

export default function ParticleBackground() { // Define a React component
  const canvasRef = useRef(null); // useRef to hold a reference to the canvas element

  useEffect(() => { // Run effect after component mounts
    const canvas = canvasRef.current; // Get the actual canvas DOM element
    const ctx = canvas.getContext("2d"); // Get 2D drawing context for the canvas

    let particles = []; // Array to store all particles
    const particleCount = 50; // Total number of particles
    const colors = ["rgba(255, 255, 255, 0.7)"]; // Particle colors (white glow)

    // 🎇 Particle Class → blueprint for creating particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width; // Random X position within canvas width
        this.y = Math.random() * canvas.height; // Random Y position within canvas height
        this.radius = Math.random() * 2 + 1; // Random size between 1–3 pixels
        this.color = colors[Math.floor(Math.random() * colors.length)]; // Pick a random color
        this.speedX = (Math.random() - 0.5) * 0.5; // Small random horizontal speed
        this.speedY = (Math.random() - 0.5) * 0.5; // Small random vertical speed
      }

      draw() {
        ctx.beginPath(); // Start drawing a new shape
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Draw a circle at (x,y) with radius
        ctx.shadowBlur = 10; // Add glow effect around the particle
        ctx.shadowColor = this.color; // Glow color matches particle color
        ctx.fillStyle = this.color; // Fill color for the particle
        ctx.fill(); // Paint the circle on canvas
      }

      update() {
        this.x += this.speedX; // Move particle horizontally
        this.y += this.speedY; // Move particle vertically

        // Wrap-around logic: if particle goes off screen, reappear from opposite side
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw(); // Redraw the particle at its new position
      }
    }

    // 🔄 Function to create all particles
    function createParticles() {
      particles = []; // Reset particles array
      for (let i = 0; i < particleCount; i++) { // Loop particleCount times
        particles.push(new Particle()); // Create and add a new particle
      }
    }

    // ✅ Resize handler → keeps canvas size same as window
    function handleResize() {
      canvas.width = window.innerWidth; // Set canvas width equal to window width
      canvas.height = window.innerHeight; // Set canvas height equal to window height
      createParticles(); // Recreate particles so they fill the resized canvas
    }

    handleResize(); // Initialize canvas size and particles on mount
    window.addEventListener("resize", handleResize); // Update when window is resized

    // 🎞️ Animation loop → makes particles move forever
    let animationId; // Store animation frame ID so we can cancel it later
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas each frame
      particles.forEach((p) => p.update()); // Update & draw every particle
      animationId = requestAnimationFrame(animate); // Schedule next frame (60fps)
    }
    animate(); // Start animation loop

    // 🧹 Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationId); // Stop animation loop
      window.removeEventListener("resize", handleResize); // Remove resize listener
    };
  }, []); // [] → run this effect only once when component mounts

  return (
    <canvas
      ref={canvasRef} // Attach ref so we can access the canvas in JS
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
      // fixed → stays fixed on screen
      // top-0 left-0 → positioned at top-left
      // w-full h-full → covers entire screen
      // pointer-events-none → doesn’t block clicks on UI
      // z-0 → stays in background
    />
  );
}
