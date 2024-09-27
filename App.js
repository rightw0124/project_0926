
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리

function App() {
  const [backendData, setBackendData] = useState("");  // 백엔드에서 가져온 메시지 저장
  const [fileSize, setFileSize] = useState("");        // 파일 크기 입력 값 저장
  const [fileResponse, setFileResponse] = useState(""); // 서버 응답 저장

  useEffect(() => {
    // 백엔드 데이터 요청 시작 로그
    console.log("백엔드에서 데이터를 요청합니다...");

    // FastAPI 서버에서 데이터를 가져옴
    axios.get("/api/data")  // 상대 경로 사용
      .then((response) => {
        console.log("백엔드로부터 받은 데이터:", response.data);
        setBackendData(response.data.message);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  }, []);

  // 파일 크기를 서버로 전송하는 함수
  const handleFileSubmit = async () => {
    console.log("서버로 전송할 파일 크기:", fileSize);

    try {
      const response = await axios.post("/api/download", { size: fileSize });
      console.log("서버로부터 받은 응답:", response.data);
      setFileResponse(response.data.message); // 서버 응답 메시지 저장
    } catch (error) {
      console.error("파일 크기 전송 오류:", error);
    }
  };

  return (
    <div className="App">
      <h1>본인 이름: 이시우</h1>
      <h2>백엔드에서 가져온 데이터: {backendData}</h2>

      <div>
        <h3>파일 크기를 입력하세요:</h3>
        <input
          type="number"
          placeholder="파일 크기(MB)"
          value={fileSize}
          onChange={(e) => setFileSize(e.target.value)}
        />
        <button onClick={handleFileSubmit}>파일 크기 전송</button>
      </div>

      {fileResponse && <h4>서버 응답: {fileResponse}</h4>}
    </div>
  );
}

export default App;

