import { useState } from "react";

export default function ChargingCalculator() {
  const usableRange = 170; // miles
  const chargingSpeed = 22; // miles per hour

  const [milesRemaining, setMilesRemaining] = useState(50);
  const [results, setResults] = useState(null);

  const calculateTimes = () => {
    const milesToFull = Math.max(usableRange - milesRemaining, 0);
    const milesTo90 = Math.max(usableRange * 0.9 - milesRemaining, 0);

    const timeToFull = milesToFull / chargingSpeed;
    const timeTo90 = milesTo90 / chargingSpeed;

    const formatTime = (hours) => {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return `${h}h ${m}m`;
    };

    setResults({
      timeToFull: `${timeToFull.toFixed(2)} hrs (${formatTime(timeToFull)})`,
      timeTo90: `${timeTo90.toFixed(2)} hrs (${formatTime(timeTo90)})`,
      milesToFull: milesToFull.toFixed(2),
      milesTo90: milesTo90.toFixed(2),
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Home Charging Calculator</h1>

        <label style={{ marginBottom: '0.5rem', display: 'block' }}>Miles Remaining:</label>
        <input
          type="number"
          value={milesRemaining}
          onChange={(e) => setMilesRemaining(Number(e.target.value))}
          min={0}
          max={usableRange}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
        />

        <button
          onClick={calculateTimes}
          style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', marginBottom: '1rem' }}
        >
          Calculate
        </button>

        {results && (
          <div style={{ lineHeight: '1.75' }}>
            <div><strong>To 100%:</strong> {results.timeToFull} ({results.milesToFull} miles)</div>
            <div><strong>To 90%:</strong> {results.timeTo90} ({results.milesTo90} miles)</div>
          </div>
        )}
      </div>
    </div>
  );
}