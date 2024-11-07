import axios from "axios";

// axios를 함수화 시키는 방법 => 공통 모듈
export default axios.create({
    baseURL: "http://localhost",
    headers:{
        "Content-Type": "application/json",
    }
})