import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ColorBar from './ColorBar';

export default function ColorBars( { maxSize }) {
  const [colorData, setColorData] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const updates = new EventSource('/api/streaming');

      updates.addEventListener('message', (update) => {
        setColorData(JSON.parse(update.data));
      });

      setListening(true);
    }
  }, [listening]);

  async function sendColor(color) {
    const { data } = await axios.post('/api/color', { hex: color });
    setColorData(data);
  }

  return (
    <div className="colorbars">
      <div className="titlebar" style={{ backgroundColor: colorData ? colorData.winner : 'white' }}>
        <span className="header">Vote for your favorite color!</span>
      </div>

      <div>
        {(colorData === null || colorData === undefined)
          ? <span>Loading color data...</span>
          : colorData.colors.map((data) => (
            <ColorBar
              key={data.hex}
              color={data.hex}
              count={data.count}
              total={colorData.total}
              maxSize={maxSize}
              clickHandler={(color) => sendColor(color)}
            />
          ))
        }
      </div>
    </div>
  );
}
