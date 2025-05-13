// src/components/CharacterGrid.js
import React from "react";

// 이미지 매핑 (캐릭터 데이터 베이스 추가한 다음 여기서 추가하면 됨)
// 캐릭터 이름을 키로 하고 이미지 경로를 값으로 하는 객체
const characterImages = {
  "여행자": "/images/여행자.png",
  "다이루크": "/images/다이루크.png",
  "진": "/images/진.png",
  "클레": "/images/클레.png",
  "모나": "/images/모나.png",
  "알베도": "/images/알베도.png",
  "유라": "/images/유라.png",
  "벤티": "/images/벤티.png",
  "엠버": "/images/엠버.png",
  "케이아": "/images/케이아.png",
  "리사": "/images/리사.png",
  "노엘": "/images/노엘.png",
  "설탕": "/images/설탕.png",
  "미카": "/images/미카.png",
  "바바라": "/images/바바라.png",
  "로자리아": "/images/로자리아.png",
  "피슬": "/images/피슬.png",
  "베넷": "/images/베넷.png",
  "레이저": "/images/레이저.png",
  "디오나": "/images/디오나.png",
  "각청": "/images/각청.png",
  "종려": "/images/종려.png",
  "치치": "/images/치치.png",
  "타르탈리아": "/images/타르탈리아.png",
  "신학": "/images/신학.png",
  "호두": "/images/호두.png",
  "소": "/images/소.png",
  "감우": "/images/감우.png",
  "야란": "/images/야란.png",
  "한운": "/images/한운.png",
  "응광": "/images/응광.png",
  "향릉": "/images/향릉.png",
  "북두": "/images/북두.png",
  "행추": "/images/행추.png",
  "중운": "/images/중운.png",
  "신염": "/images/신염.png",
  "연비": "/images/연비.png",
  "운근": "/images/운근.png",
  "요요": "/images/요요.png",
  "가명": "/images/가명.png",
  "남연": "/images/남연.png",
  "아야카": "/images/아야카.png",
  "코코미": "/images/코코미.png",
  "이토": "/images/이토.png",
  "카즈하": "/images/카즈하.png",
  "요이미야": "/images/요이미야.png",
  "라이덴": "/images/라이덴.png",
  "치오리": "/images/치오리.png",
  "미즈키": "/images/미즈키.png",
  "토마": "/images/토마.png",
  "사라": "/images/사라.png",
  "헤이죠": "/images/헤이죠.png",
  "고로": "/images/고로.png",
  "시노부": "/images/시노부.png",
  "사유": "/images/사유.png",
  "키라라": "/images/키라라.png",
  "나히다": "/images/나히다.png",
  "타이나리": "/images/타이나리.png",
  "사이노": "/images/사이노.png",
  "닐루": "/images/닐루.png",
  "알하이탐": "/images/알하이탐.png",
  "데히야": "/images/데히야.png",
  "방랑자": "/images/방랑자.png",
  "콜레이": "/images/콜레이.png",
  "세토스": "/images/세토스.png",
  "도리": "/images/도리.png",
  "캔디스": "/images/캔디스.png",
  "레일라": "/images/레일라.png",
  "파루잔": "/images/파루잔.png",
  "카베": "/images/카베.png",
  "리니": "/images/리니.png",
  "느비예트": "/images/느비예트.png",
  "아를레키노": "/images/아를레키노.png",
  "푸리나": "/images/푸리나.png",
  "에밀리": "/images/에밀리.png",
  "라이오슬리": "/images/라이오슬리.png",
  "시그윈": "/images/시그윈.png",
  "나비아": "/images/나비아.png",
  "클로린드": "/images/클로린드.png",
  "리넷": "/images/리넷.png",
  "프레미네": "/images/프레미네.png",
  "샤를로트": "/images/샤를로트.png",
  "슈브르즈": "/images/슈브르즈.png",
  "실로닌": "/images/실로닌.png",
  "키니치": "/images/키니치.png",
  "마비카": "/images/마비카.png",
  "말라니": "/images/말라니.png",
  "시틀라리": "/images/시틀라리.png",
  "바레사": "/images/바레사.png",
  "차스카": "/images/차스카.png",
  "카치나": "/images/카치나.png",
  "얀사": "/images/얀사.png",
  "올로룬": "/images/올로룬.png",
  "이파": "/images/이파.png",
  "에스코피에": "/images/에스코피에.png",
  "달리아": "/images/달리아.png",
  "스커크": "/images/스커크.png",
  "아야토": "/images/아야토.png",

  "default": "/images/default.png",
};

function CharacterGrid({ characters, selectedCharacter, onSelectCharacter }) {
  // 캐릭터 이미지를 가져오는 함수 (매핑 객체에서 찾고, 없으면 기본 이미지)
  
  const getCharacterImage = (charName) => {
    return characterImages[charName] || "/images/default.png";
  };

  return (
    <div className="w-[400px] flex items-center justify-center border-2 border-blue-700 placeholder:rounded-md mx-4 rounded-md bg-gray-950 bg-opacity-50">



      <div className="right-panel w-[450px] py-6 px-6 max-h-[650px] overflow-y-scroll no-scrollbar">
        <div className="character-grid grid grid-cols-3 gap-2">
          {characters.map((charName) => (
            <div
              key={charName}
              className={`rounded-md character-cell bg-gray-200 border border-blue-700 flex flex-col items-center justify-center h-[7rem] text-xs cursor-pointer bg-cover ${
                selectedCharacter === charName ? "border-blue-300 border-2" : ""
              }`}
              style={{
                backgroundImage: `url("/images/profile.png")`,
              }}
              onClick={() => onSelectCharacter(charName)}
            >
              <img
                src={getCharacterImage(charName)}
                alt={charName}
                className="w-full object-cover rounded-t-md"
              />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterGrid;
