// src/pages/MainPage.js
import React, { useState, useEffect, useRef } from "react";
import TitleBar from "../components/TitleBar";
import TitleModal from "../components/TitleModal";
import RegionSelector from "../components/RegionSelector";
import TierChart from "../components/TierChart";
import CharacterGrid from "../components/CharacterGrid";
import ChatBox from "../components/ChatBox";
import { io } from "socket.io-client";
import { regionCharacters } from "../data/regionData";
import html2canvas from 'html2canvas';

function MainPage({ onLogout, token }) {
  // 제목 & 모달
  const [boardTitle, setBoardTitle] = useState(
    "제목을 입력해주세요"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const captureRef = useRef(null);


  // 지역 / 캐릭터
  const [currentRegion, setCurrentRegion] = useState("all");
  const [selectedCharacter, setSelectedCharacter] = useState("");

  // 티어 (8~1등)
  const [rankSlots, setRankSlots] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  // 채팅 & 소켓
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [nickname, setNickname] = useState("");
  const [chatInput, setChatInput] = useState("");
  

  // 소켓 연결
  useEffect(() => {
    const newSocket = io("https://genshin-impact-tier-list-server.onrender.com/");
    setSocket(newSocket);

    newSocket.on("chat", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    newSocket.on("tier updated", (updatedTier) => {
      setRankSlots(updatedTier); // 다른 유저가 보낸 티어로 갱신
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);


  useEffect(() => {
    if (!socket) return;
  
    socket.on("character highlight", ({ character, socketId }) => {
      console.log(`다른 유저(${socketId})가 캐릭터 선택:`, character);
    });
  
    return () => {
      socket.off("character highlight");
    };
  }, [socket]);

  


  // 지역 목록 (regionData의 key만 추출)
  const regionKeys = [
    "all",
    ...Object.keys(regionCharacters).filter((key) => key !== "all"),
  ];

  // 티어에 캐릭터 배치
  const handlePlaceCharacter = (rank) => {
    if (!selectedCharacter) {
      alert("먼저 캐릭터를 선택하세요!");
      return;
    }
  
    // 캐릭터 위치 업데이트
      const updatedSlots = {
        ...rankSlots,
        [rank]: selectedCharacter,
      };

      setRankSlots(updatedSlots); // 상태 업데이트
      setSelectedCharacter(null); // 선택 초기화

      if (socket) {
        socket.emit("update tier", updatedSlots); // 소켓 emit은 여기서
      }
  };


  
  // 채팅 전송
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const messageObj = {
      nickname: nickname || "익명",
      message: chatInput,
    };
    if (socket) {
      socket.emit("chat", messageObj);
    }
    setChatInput("");
  };

  // 공유함수
  const handleShare = async () => {
    const buttons = document.querySelectorAll(".placement-button");
    buttons.forEach((btn) => (btn.style.display = "none"));

    if (!captureRef.current) {
      alert("캡처할 영역이 없습니다!");
      return;
    }

    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        logging: true,
        scrollY: -window.scrollY, // 스크롤 위치 반영 안되게
        scale: 2 // 해상도 올리기
      });

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "tier-chart.png";
      link.click();
    } catch (err) {
      console.error("캡처 실패", err);
      alert("이미지를 캡처할 수 없습니다.");
    }finally {

      buttons.forEach((btn) => (btn.style.display = ""));
    }
  };

  return (
    <div className="relative min-h-screen ">
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat blur-sm"
      style={{
        backgroundImage: `url("/buttonImages/background.png")`,
      }}
    ></div>

  <div className="relative z-10">

    {/* 상단 바: 제목, 설정, 공유 버튼 */}
     <TitleBar
        boardTitle={boardTitle}
        onOpenModal={() => setModalOpen(true)}
        onShare={handleShare}
        onLogout={onLogout}
      />

      {/* 제목 변경 모달 */}
      <TitleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentTitle={boardTitle}
        onSave={(newTitle) => setBoardTitle(newTitle)}
      />

      {/* 본문: 메인 영역 */}
      <div className="main-container flex flex-1">
        <RegionSelector
          regions={regionKeys}
          currentRegion={currentRegion}
          onSelectRegion={(reg) => {
            setCurrentRegion(reg);
            setSelectedCharacter("");
          }}
        />

        {/* 중앙: 티어 차트 영역 */}
        
        <TierChart 
        
        rankSlots={rankSlots} 
        onPlaceCharacter={handlePlaceCharacter} 
        socket={socket}
        /> 
        <CharacterGrid
          characters={currentRegion === "all"
            ? Object.values(regionCharacters).flat()
            : regionCharacters[currentRegion] || []
          }
          onSelectCharacter={(charName) => {
            console.log("선택된 캐릭터:", charName); // 추가
            setSelectedCharacter(charName);
            if (socket) {
              console.log("소켓에 emit 보냄");
              socket.emit("character selected", charName);
            }
          }}

          selectedCharacter={selectedCharacter}
        />
      </div>

      {/* 하단: 채팅 영역 */}
      <ChatBox
        messages={chatMessages}
        nickname={nickname}
        onChangeNickname={setNickname}
        chatInput={chatInput}
        onChangeChatInput={setChatInput}
        onSendChat={handleSendChat}
      />

      {/* 가장 하단: 기획/제작 문구 */}
      <div className="footer-bar w-full bg-black text-center py-1 font-bold text-white">
        기획: 원신 이혜원 / 제작: 후라보노
      </div>
  </div>

      {/* 캡쳐 영역 / 캡쳐 할 부분, 만지지마세요. */}
      <div
            style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
            ref={captureRef}
          >
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
                style={{ backgroundImage: `url("/buttonImages/background.png")` }}>
              
              {/* 어두운 배경 효과 */}
              <div className="absolute inset-0 bg-black/70 blur-sm brightness-75 z-0"></div>

              {/* 내용 */}
              <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6 py-10">
                <h2 className="text-2xl font-bold text-white text-center mb-8 tracking-wide">
                  {boardTitle}
                </h2>

                <TierChart
                  rankSlots={rankSlots}
                />
              </div>
            </div>
    </div>

    </div>
  );
}

export default MainPage;
