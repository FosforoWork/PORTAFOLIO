import React from 'react';

// 1. Optimización de Tintas (EMPACAR S.A.)
export function InkOptimizationVisual() {
  return (
    <svg 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full max-h-[220px] transition-transform duration-500 group-hover:scale-105"
    >
      {/* Background patterns */}
      <rect width="400" height="300" fill="#F4EFEA" />
      <path d="M50 0V300M150 0V300M250 0V300M350 0V300" stroke="#C2B9A7" strokeOpacity="0.2" strokeWidth="1" />
      <path d="M0 75H400M0 150H400M0 225H400" stroke="#C2B9A7" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />

      {/* Corrugated board representation (layering) */}
      <path d="M80 200C90 190 100 190 110 200C120 210 130 210 140 200C150 190 160 190 170 200C180 210 190 210 200 200C210 190 220 190 230 200C240 210 250 210 260 200C270 190 280 190 290 200C300 210 310 210 320 200" stroke="#71797E" strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="188" x2="325" y2="188" stroke="#36454F" strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="212" x2="325" y2="212" stroke="#36454F" strokeWidth="2" strokeLinecap="round" />

      {/* Dosing nozzle */}
      <rect x="185" y="50" width="30" height="60" rx="4" fill="#36454F" />
      <rect x="195" y="110" width="10" height="15" fill="#71797E" />
      
      {/* Falling Ink drops */}
      <circle cx="200" cy="140" r="4" fill="#B7410E" />
      <circle cx="200" cy="165" r="6" fill="#B7410E" />
      
      {/* Splashes/impact of ink */}
      <path d="M190 188C195 180 205 180 210 188" stroke="#B7410E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="180" cy="180" r="2" fill="#B7410E" />
      <circle cx="220" cy="182" r="2.5" fill="#B7410E" />

      {/* Elegant HUD markers */}
      <circle cx="200" cy="80" r="6" stroke="#E8DED1" strokeWidth="1.5" />
      <line x1="160" y1="80" x2="240" y2="80" stroke="#B7410E" strokeWidth="1" strokeDasharray="2 2" />
      <text x="250" y="84" fill="#B7410E" fontSize="9" fontFamily="monospace" letterSpacing="1">D-INK MAX</text>
    </svg>
  );
}

// 2. Estructuración de Costos Industriales (Guabirá)
export function IndustrialCostsVisual() {
  return (
    <svg 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full max-h-[220px] transition-transform duration-500 group-hover:scale-105"
    >
      <rect width="400" height="300" fill="#F4EFEA" />
      {/* grid background */}
      <path d="M50 0V300M100 0V300M150 0V300M200 0V300M250 0V300M300 0V300M350 0V300" stroke="#C2B9A7" strokeOpacity="0.15" strokeWidth="1" />
      <path d="M0 50H400M0 100H400M0 150H400M0 200H400M0 250H400" stroke="#C2B9A7" strokeOpacity="0.15" strokeWidth="1" />

      {/* Axis */}
      <line x1="80" y1="70" x2="80" y2="230" stroke="#36454F" strokeWidth="2" />
      <line x1="80" y1="230" x2="320" y2="230" stroke="#36454F" strokeWidth="2" />

      {/* Cost bars (representing structural blocks of costs) */}
      {/* Raw material cost */}
      <rect x="100" y="150" width="30" height="80" fill="#71797E" rx="2" />
      {/* Industrial process cost */}
      <rect x="150" y="110" width="30" height="120" fill="#C2B9A7" rx="2" />
      {/* Distribution/Logistics */}
      <rect x="200" y="130" width="30" height="100" fill="#808080" rx="2" />
      {/* Profit Margin (Rust accent) */}
      <rect x="250" y="80" width="30" height="150" fill="#B7410E" rx="2" />

      {/* Target Profit Curve (elegant line) */}
      <path d="M115 140C165 100 215 110 265 70" stroke="#36454F" strokeWidth="2" strokeLinecap="round" />
      <circle cx="115" cy="140" r="3" fill="#36454F" />
      <circle cx="165" cy="105" r="3" fill="#36454F" />
      <circle cx="215" cy="115" r="3" fill="#36454F" />
      <circle cx="265" cy="70" r="4" fill="#B7410E" />

      {/* HUD Info */}
      <text x="280" y="65" fill="#B7410E" fontSize="9" fontFamily="monospace" letterSpacing="1">ROAS +14.2%</text>
      <line x1="265" y1="70" x2="320" y2="70" stroke="#B7410E" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

// 3. SST Manager (Seguridad y Salud en el Trabajo)
export function SstManagerVisual() {
  return (
    <svg 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full max-h-[220px] transition-transform duration-500 group-hover:scale-105"
    >
      <rect width="400" height="300" fill="#F4EFEA" />
      <circle cx="200" cy="150" r="100" stroke="#C2B9A7" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="200" cy="150" r="120" stroke="#C2B9A7" strokeOpacity="0.1" strokeWidth="1" />

      {/* Shield/Check mark geometry */}
      <path 
        d="M200 60C225 60 260 70 270 95C270 170 220 220 200 230C180 220 130 170 130 95C140 70 175 60 200 60Z" 
        stroke="#36454F" 
        strokeWidth="3" 
        strokeLinejoin="round" 
      />
      
      {/* Interior safe zone target check */}
      <path 
        d="M170 145L190 165L235 120" 
        stroke="#B7410E" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Crosshairs & details */}
      <line x1="200" y1="30" x2="200" y2="50" stroke="#71797E" strokeWidth="2" />
      <line x1="200" y1="240" x2="200" y2="260" stroke="#71797E" strokeWidth="2" />
      <line x1="80" y1="150" x2="110" y2="150" stroke="#71797E" strokeWidth="2" />
      <line x1="290" y1="150" x2="320" y2="150" stroke="#71797E" strokeWidth="2" />

      <text x="215" y="220" fill="#36454F" fontSize="8" fontFamily="monospace" letterSpacing="2">SAFE PROTOCOL</text>
    </svg>
  );
}

// 4. Gemelo Digital (Planta de Proteína de Soja)
export function DigitalTwinVisual() {
  return (
    <svg 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full max-h-[220px] transition-transform duration-500 group-hover:scale-105"
    >
      <rect width="400" height="300" fill="#F4EFEA" />

      {/* Isometric/Blueprint Grid */}
      <path d="M50 50L350 250M50 250L350 50" stroke="#C2B9A7" strokeOpacity="0.2" strokeWidth="1" />
      <path d="M200 20V280" stroke="#C2B9A7" strokeOpacity="0.1" strokeWidth="1" />
      <path d="M20 150H380" stroke="#C2B9A7" strokeOpacity="0.1" strokeWidth="1" />

      {/* Physical Plant (Left Side - Charcoal) */}
      <g transform="translate(-10, 0)">
        {/* Reactor / Silo */}
        <rect x="90" y="100" width="50" height="100" rx="3" fill="#36454F" />
        <path d="M90 100L115 80L140 100Z" fill="#71797E" />
        {/* Pipes */}
        <path d="M140 150H180V180" stroke="#36454F" strokeWidth="4" strokeLinejoin="round" />
        {/* Small Valve */}
        <circle cx="180" cy="180" r="5" fill="#B7410E" />
      </g>

      {/* Digital Twin (Right Side - Wireframe / Rust Accent) */}
      <g transform="translate(10, 0)">
        {/* Reactor / Silo Wireframe */}
        <rect x="250" y="100" width="50" height="100" rx="3" stroke="#B7410E" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M250 100L275 80L300 100Z" stroke="#B7410E" strokeWidth="2" fill="none" />
        {/* Pipes Wireframe */}
        <path d="M250 150H210V180" stroke="#B7410E" strokeWidth="2" strokeLinejoin="round" strokeDasharray="2 2" />
        {/* Small Pulse Node */}
        <circle cx="210" cy="180" r="5" fill="#36454F" />
      </g>

      {/* Connection Links (The Digital Mapping lines) */}
      <path d="M130 110L270 110" stroke="#808080" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M130 170L270 170" stroke="#808080" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
      
      {/* Simulation / Data stream indicators */}
      <path d="M180 110L190 105L200 110" stroke="#B7410E" strokeWidth="2" strokeLinecap="round" />
      <text x="175" y="98" fill="#B7410E" fontSize="8" fontFamily="monospace">SIM.OK</text>
    </svg>
  );
}

// 5. Portafolio Web Personal (Maletín Empresarial / Código)
export function PortfolioVisual() {
  return (
    <svg 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full max-h-[220px] transition-transform duration-500 group-hover:scale-105"
    >
      <rect width="400" height="300" fill="#F4EFEA" />
      
      {/* Concentric rings to make it feel like a plan/blueprint */}
      <circle cx="200" cy="150" r="110" stroke="#C2B9A7" strokeOpacity="0.2" strokeWidth="1" />
      
      {/* Minimalist Briefcase / Maletín */}
      {/* Handle */}
      <path d="M170 95C170 85 230 85 230 95" stroke="#36454F" strokeWidth="4" strokeLinecap="round" />
      
      {/* Main body */}
      <rect x="120" y="105" width="160" height="110" rx="8" fill="#36454F" />
      
      {/* Briefcase front flap / leather cut detail */}
      <path d="M120 105H280V140L200 165L120 140V105Z" fill="#71797E" />
      
      {/* Metallic Lock / Clasp (Rust Accent) */}
      <rect x="185" y="150" width="30" height="20" rx="3" fill="#B7410E" />
      <circle cx="200" cy="160" r="3" fill="#E8DED1" />

      {/* Decorative stitching lines */}
      <path d="M125 110H275" stroke="#E8DED1" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.4" />
      <path d="M125 135L200 158L275 135" stroke="#E8DED1" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.4" />

      {/* Code overlay / Technical coordinate markers */}
      <line x1="120" y1="215" x2="280" y2="215" stroke="#C2B9A7" strokeWidth="1" />
      <circle cx="120" cy="215" r="2.5" fill="#B7410E" />
      <circle cx="280" cy="215" r="2.5" fill="#B7410E" />
      
      <text x="215" y="240" fill="#36454F" fontSize="8" fontFamily="monospace" letterSpacing="2">ENG.PORTFOLIO</text>
    </svg>
  );
}
