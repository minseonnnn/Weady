import {useState, useRef} from "react"
import {useNavigate,Link} from "react-router-dom"
import {useQuery} from "react-query"
import apiClient from "../../http-commons"

function Login({handleLogin}) {
    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const idRef = useRef(null)
    const pwdRef = useRef(null)
    const navigate = useNavigate()

    // 로그인 요청 쿼리
    const { refetch: loginOk, isLoading, isError, data } = useQuery(
        ['login-ok'],
        async () => await apiClient.get(`/member/login/${id}/${pwd}`),
        {
            enabled: false,
            onSuccess: (res) => {
                if (res.data.msg === 'NOID') {
                    alert("아이디가 존재하지 않습니다")
                    setId('')
                    setPwd('')
                    idRef.current.focus()
                } else if (res.data.msg === "NOPWD") {
                    alert("비밀번호가 틀립니다")
                    setPwd('')
                    pwdRef.current.focus()
                } else if (res.data.msg === "OK") {
                    window.sessionStorage.setItem('id', res.data.id)
                    window.sessionStorage.setItem('name', res.data.name)
                    handleLogin()
                    navigate('/')
                }
            },
            onError: (err) => {
                console.log(err.response)
            }
        }
    )
    const memberLogin = () => {
        if (id.trim() === "") {
            idRef.current.focus()
            return
        } else if (pwd.trim() === "") {
            pwdRef.current.focus()
            return
        }
        loginOk()
    }

    return (
        <section id="login-container" className="d-flex justify-content-center align-items-center py-lg-9" style={{marginTop:'100px',marginBottom:'100px'}}>
            <div className="login-box p-4" style={{
                height: '430px',
                width: '350px',
                border: '2px solid #6c4f3d',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 className="text-center">Login</h2>
                <div>
                    <div className="form-group">
                        <label htmlFor="id">아이디</label>
                        <input
                            type="text"
                            id="id"
                            className="form-control"
                            placeholder="아이디를 입력하세요"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            ref={idRef}
                        />
                    </div>
                    <div style={{height: '10px'}}></div>
                    <div className="form-group">
                        <label htmlFor="pwd">비밀번호</label>
                        <input
                            type="password"
                            id="pwd"
                            className="form-control"
                            placeholder="비밀번호를 입력하세요"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            ref={pwdRef}
                        />
                    </div>

                    <div className="text-center">
                        <button
                            onClick={memberLogin}
                            style={{borderRadius: '5px', backgroundColor: 'olive'}}
                            className="btn btn-primary w-100 mt-4"
                        >
                            로그인
                        </button>
                    </div>
                    <div style={{height: '5px'}}></div>
                    <p className="noto-sans" style={{fontSize: '13px', textAlign: 'end'}}>아직 회원이 아니신가요? <Link
                        to={"/member/join"}>회원가입</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login
