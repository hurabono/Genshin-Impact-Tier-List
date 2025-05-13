// src/components/TierChart.js
import React from "react";

function TierChart({ rankSlots, onPlaceCharacter }) {
  const handleClick = (rank) => {
    onPlaceCharacter(rank); // 부모에서 알아서 처리
  };
  
  const barHeights = {
    1: 400,
    2: 350,
    3: 300,
    4: 250,
    5: 200,
    6: 150,
    7: 100,
    8: 50,
  };

  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  // 해당 캐릭터 이름으로 이미지 URL 반환
  const getCharacterImageUrl = (charName) => {
    return `/images/${charName}.png`; 
  };

  return (
    <div className="bg-gray-950 bg-opacity-50 border-2 border-blue-700 center-panel flex-1 flex items-end justify-center relative rounded-md mx-4 p-6">
      <div className="chart-container flex gap-4 items-end justify-center">
        {ranks.map((rank) => (
          <div className="bar-item flex flex-col items-center" key={rank}>
            
            <div className="white-box w-24 mb-5 flex items-center justify-center text-sm rounded-md">
              {rankSlots[rank] ? (
                <img
                  src={getCharacterImageUrl(rankSlots[rank])}
                  alt={rankSlots[rank]}
                  className="w-full h-full object-fill rounded-md bg-cover border "
                  style={{
                    backgroundImage: `url("/images/profile.png")`,
                  }}
                />
              ) : (
                <img
                  src="/images/placeholder.png"
                  alt="placeholder"
                  className="w-full h-full object-fill rounded-md bg-cover border "
                />
              )}
            </div>

            <div
              className="grey-bar w-24 bg-gradient-to-b from-[#2a3597] to-[#1d204b] border-white border"
              style={{ height: barHeights[rank],}}
              
            />
            <div className="bar-label text-md mt-1 font-bold text-white">★ {rank} 등</div>
                {onPlaceCharacter && (
                  <button
                    className="placement-button place-btn tracking-widest text-white bg-[#1d204b]  border-2 border-blue-700 px-5 py-2  mt-5 text-lg rounded-md"
                    onClick={() => handleClick(rank)}
                  >
                    배치
                  </button>
                )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TierChart;
