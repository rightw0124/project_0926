from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 모델 정의 (파일 크기를 받기 위한 모델)
class FileSizeRequest(BaseModel):
    size: int

# 기본 데이터 제공 API
@app.get("/api/data")
async def get_data():
    return {"message": "안녕하세요, 백엔드에서 전달하는 데이터입니다."}

# 파일 크기를 처리하는 API
@app.post("/api/download")
async def download_file(file_info: FileSizeRequest):
    file_size = file_info.size
    
    # 500MB 이상의 파일은 분산 처리 요청
    if file_size > 500:
        return {"message": "파일 크기가 500MB를 초과하므로 분산 처리되었습니다."}
    else:
        return {"message": "파일 크기가 500MB 미만이므로 바로 다운로드 가능합니다."}
