import {useState, useRef} from "react"
import {useNavigate,Link} from "react-router-dom"
import {useQuery} from "react-query"
import apiClient from "../../http-commons"

function Join() {
    const [id, setId] = useState('')
    const [nickname, setNick] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdCheck, setPwdCheck] = useState('')

    const idRef = useRef(null)
    const pwdRef = useRef(null)
    const pwdckRef = useRef(null)
    const nickRef = useRef(null)

    const memberJoin = async() => {
        if (id.trim() === "") {
            idRef.current.focus()
            alert("아이디를 입력해주세요")
            return
        } else if (nickname.trim() === "") {
            nickRef.current.focus()
            alert("닉네임을 입력해주세요")
            return
        }else if (pwd.trim() === "") {
            pwdRef.current.focus()
            alert("비밀번호를 입력해주세요")
            return
        }else if (pwdCheck.trim() === "") {
            pwdckRef.current.focus()
            alert("비밀번호 확인을 입력해주세요")
            return
        }else if (pwd !== pwdCheck) {
            alert("비밀번호가 일치하지 않습니다")
            pwdRef.current.focus()
            return
        }

        try {
            const response = await apiClient.post('/member/signup', {
                id:id,pwd:pwd,nickname:nickname
            })

            if (response.data.msg === "NOID") {
                alert("이미 존재하는 아이디입니다")
                setId('')
                idRef.current.focus()
            } else if (response.data.msg === "NONICK") {
                alert("이미 존재하는 닉네임입니다")
                setNick('')
                nickRef.current.focus()
            } else if (response.data.msg === "OK") {
                alert('회원가입 성공')
                window.location.href="/"
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <section id="login-container" className="d-flex justify-content-center align-items-center py-lg-9"
                 style={{marginTop: '80px', marginBottom: '80px'}}>
            <div className="login-box p-4"
            style={{
                height: '550px',
                width: '350px',
                border: '2px solid #6c4f3d',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 className="text-center" style={{fontSize:'50px'}}>Sign up</h2>
                <div>
                    <div className="form-group">
                        <label htmlFor="id">아이디</label>
                        <input
                            type="text"
                            id="id"
                            ref={idRef}
                            className="form-control"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="아이디를 입력하세요"
                        />
                    </div>
                    <div style={{height: '10px'}}></div>
                    <div className="form-group">
                        <label htmlFor="nickname">닉네임</label>
                        <input
                            type="text"
                            id="nickname"
                            ref={nickRef}
                            value={nickname}
                            onChange={(e) => setNick(e.target.value)}
                            className="form-control"
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>
                    <div style={{height: '10px'}}></div>
                    <div className="form-group">
                        <label htmlFor="pwd">비밀번호</label>
                        <input
                            type="password"
                            id="pwd"
                            ref={pwdRef}
                            className="form-control"
                            placeholder="비밀번호를 입력하세요"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                    <div style={{height: '10px'}}></div>
                    <div className="form-group">
                        <label htmlFor="pwd">비밀번호 확인</label>
                        <input
                            type="password"
                            id="pwdCheck"
                            ref={pwdckRef}
                            className="form-control"
                            placeholder="비밀번호를 입력하세요"
                            value={pwdCheck}
                            onChange={(e) => setPwdCheck(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            style={{borderRadius: '5px', backgroundColor: 'olive'}}
                            className="btn btn-primary w-100 mt-4" onClick={memberJoin}>
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Join