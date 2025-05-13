// src/components/RegionSelector.js
import React from "react";

  const regionLabels = {
    all: "전체 캐릭터",
    mondstadt: "몬드",
    liyue: "리월",
    inazuma: "이나즈마",
    fontaine: "폰타인",
    natlan: "나타",
  };


function RegionSelector({ regions, currentRegion, onSelectRegion }) {
  return (
    <div className="left-panel w-[320px] flex flex-col gap-2 p-6 mx-4 rounded-md bg-gray-950 bg-opacity-50 border-2 border-blue-700">
      {regions.map((regionKey) => (
        <button
          key={regionKey}
          className={`relative border-2 border-blue-700 bg-gray-300 p-2 h-[90px] rounded-md bg-no-repeat bg-left bg-cover ${
            currentRegion === regionKey ? "font-bold" : ""
          }`}
          style={{
            backgroundImage: `url("/buttonImages/${regionKey}.png")`,
          }}
          onClick={() => onSelectRegion(regionKey)}
        >
          <span className="absolute bottom-2 right-2 text-white text-xl px-2 rounded ">
            {regionLabels[regionKey] || regionKey}
          </span>
        </button>
      ))}
    </div>
  );
}

export default RegionSelector;
