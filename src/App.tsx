import { useState, useEffect, useRef, useCallback } from 'react';
import { planets, sunData, PlanetData } from './data/planets';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showSunInfo, setShowSunInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [angles, setAngles] = useState<number[]>(planets.map((_, i) => (i * Math.PI * 2) / 8));
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const anglesRef = useRef<number[]>(planets.map((_, i) => (i * Math.PI * 2) / 8));

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    if (isPlaying) {
      const newAngles = anglesRef.current.map((angle, i) => {
        // Base speed: complete one orbit in proportional time
        // Earth takes ~10 seconds for a full orbit at speed 1
        const basePeriod = planets[i].orbitalPeriod / 365; // relative to Earth
        const angularSpeed = (2 * Math.PI) / (10 * basePeriod);
        return angle + angularSpeed * delta * speed;
      });
      anglesRef.current = newAngles;
      setAngles([...newAngles]);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, speed]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setShowSunInfo(false);
  };

  const handleSunClick = () => {
    setShowSunInfo(true);
    setSelectedPlanet(null);
  };

  const handleClose = () => {
    setSelectedPlanet(null);
    setShowSunInfo(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] overflow-hidden relative flex flex-col items-center justify-center">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-bold text-white z-10 tracking-wide">
        <span className="text-yellow-400">☀</span> Solar System Explorer
      </h1>

      {/* Solar System Container */}
      <div className="relative w-[900px] h-[900px] max-w-[95vw] max-h-[75vh] flex items-center justify-center">
        {/* Orbital paths */}
        {planets.map((planet) => (
          <div
            key={`orbit-${planet.id}`}
            className="absolute rounded-full border border-white/10"
            style={{
              width: planet.orbitRadius * 2 + 'px',
              height: planet.orbitRadius * 2 + 'px',
            }}
          />
        ))}

        {/* Sun */}
        <div
          className="absolute rounded-full cursor-pointer z-10 flex items-center justify-center transition-transform hover:scale-110"
          style={{
            width: '50px',
            height: '50px',
            background: 'radial-gradient(circle, #fff5c0 0%, #ffd700 30%, #ff8c00 70%, #ff4500 100%)',
            boxShadow: '0 0 40px 15px rgba(255, 165, 0, 0.5), 0 0 80px 30px rgba(255, 100, 0, 0.3), 0 0 120px 50px rgba(255, 50, 0, 0.15)',
          }}
          onClick={handleSunClick}
        >
          <div className="absolute inset-0 rounded-full animate-pulse opacity-50"
            style={{ background: 'radial-gradient(circle, rgba(255,255,200,0.4) 0%, transparent 70%)' }}
          />
        </div>

        {/* Planets */}
        {planets.map((planet, index) => {
          const x = Math.cos(angles[index]) * planet.orbitRadius;
          const y = Math.sin(angles[index]) * planet.orbitRadius;
          const isHovered = hoveredPlanet === planet.id;
          const isSelected = selectedPlanet?.id === planet.id;

          return (
            <div
              key={planet.id}
              className="absolute cursor-pointer transition-transform duration-200"
              style={{
                width: planet.size + 'px',
                height: planet.size + 'px',
                transform: `translate(${x - planet.size / 2}px, ${y - planet.size / 2}px) scale(${isHovered || isSelected ? 1.4 : 1})`,
                zIndex: isHovered || isSelected ? 20 : 5,
              }}
              onClick={() => handlePlanetClick(planet)}
              onMouseEnter={() => setHoveredPlanet(planet.id)}
              onMouseLeave={() => setHoveredPlanet(null)}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.glowColor})`,
                  boxShadow: isHovered || isSelected
                    ? `0 0 ${planet.size}px 3px ${planet.color}80, 0 0 ${planet.size * 2}px 5px ${planet.color}40`
                    : `0 0 ${planet.size / 2}px 1px ${planet.color}40`,
                }}
              />
              {/* Saturn's ring */}
              {planet.id === 'saturn' && (
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#e8d5a0]/60 pointer-events-none"
                  style={{
                    width: planet.size * 1.8 + 'px',
                    height: planet.size * 0.6 + 'px',
                    transform: `translate(-50%, -50%) rotateX(70deg)`,
                  }}
                />
              )}
              {/* Planet label on hover */}
              {(isHovered || isSelected) && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white whitespace-nowrap font-medium bg-black/60 px-2 py-0.5 rounded">
                  {planet.name}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Panel */}
      {(selectedPlanet || showSunInfo) && (
        <div className="absolute top-16 right-4 md:right-8 w-80 bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-5 z-50 text-white shadow-2xl animate-fadeIn">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
          
          {showSunInfo ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full"
                  style={{ background: 'radial-gradient(circle, #fff5c0, #ffd700, #ff8c00)' }}
                />
                <h2 className="text-xl font-bold text-yellow-400">{sunData.name}</h2>
              </div>
              <p className="text-sm text-gray-300 mb-3">{sunData.description}</p>
              <div className="space-y-2 text-sm">
                <InfoRow label="Type" value={sunData.type} />
                <InfoRow label="Diameter" value={`${sunData.diameter.toLocaleString()} km`} />
                <InfoRow label="Surface Temp" value={sunData.temperature} />
                <InfoRow label="Age" value={sunData.age} />
              </div>
            </div>
          ) : selectedPlanet && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full"
                  style={{ background: `radial-gradient(circle at 35% 35%, ${selectedPlanet.color}, ${selectedPlanet.glowColor})` }}
                />
                <h2 className="text-xl font-bold" style={{ color: selectedPlanet.color }}>{selectedPlanet.name}</h2>
              </div>
              <p className="text-sm text-gray-300 mb-3">{selectedPlanet.description}</p>
              <div className="space-y-2 text-sm">
                <InfoRow label="Type" value={selectedPlanet.type} />
                <InfoRow label="Diameter" value={`${selectedPlanet.diameter.toLocaleString()} km`} />
                <InfoRow label="Distance from Sun" value={`${selectedPlanet.distanceFromSun} million km`} />
                <InfoRow label="Orbital Period" value={`${selectedPlanet.orbitalPeriod.toLocaleString()} Earth days`} />
                <InfoRow label="Known Moons" value={selectedPlanet.moons.toString()} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 z-50 flex items-center gap-6">
        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
          )}
        </button>

        {/* Speed Control */}
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-xs font-medium">Speed</span>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-28 accent-yellow-400"
          />
          <span className="text-yellow-400 text-sm font-bold min-w-[3ch]">{speed.toFixed(1)}x</span>
        </div>

        {/* Planet legend */}
        <div className="hidden md:flex items-center gap-2 ml-4 border-l border-white/20 pl-4">
          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => handlePlanetClick(planet)}
              className="w-5 h-5 rounded-full transition-transform hover:scale-150 border border-white/20"
              style={{ background: planet.color }}
              title={planet.name}
            />
          ))}
        </div>
      </div>

      {/* Instruction hint */}
      {!selectedPlanet && !showSunInfo && (
        <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 text-white/40 text-sm animate-pulse">
          Click on any planet or the Sun to learn more
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

export default App;
