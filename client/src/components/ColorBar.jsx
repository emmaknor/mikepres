import React from 'react';

export default function ColorBar({ color, count, total, maxSize, clickHandler }) {
  const size = total === 0 || count === 0 ? 10 : count / total * maxSize;

  return (
    <div className="colorbar-container">
      <button
        className="colorbutton"
        onClick={() => clickHandler(color)}
      >
        {count}
      </button>

      <div
        className="colorbar"
        style={{
          backgroundColor: color,
          width: `${size}px`,
        }}>
      </div>
    </div>
  );
}
