import {Fragment,useState,useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import apiClient from "../../http-commons"
function Insert(){
    const nav = useNavigate()
    const subjectRef = useRef(null)
    const contentRef = useRef(null)
    const [sessionId, setSessionId] = useState(window.sessionStorage.getItem("id")||'')
    const [sessionname,  setSessionname] = useState(window.sessionStorage.getItem("name")||'')
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")

    const {isLoading,mutate:insert}=useMutation(
        async ()=>{
            return await apiClient.post(`/board/insert`,{
                userid:sessionId,
                name:sessionname,
                subject:subject,
                content:content
            })
        },
        {
            onSuccess:(res)=>{
                    window.location.href="/board/list";
            }
        },
        {
            onError:(err)=>{
                console.log(err)
            }
        }
    )

    const boardInsert=()=>{
        if(subject.trim()==="")
        {
            subjectRef.current.focus()
            return
        }
        else if(content.trim()==="")
        {
            contentRef.current.focus()
            return
        }
        insert()
    }

    return (
        <div className="container" style={{marginTop: "150px",marginBottom:"250px"}}>
            <div className="freeboard-box p-4">
                <h3 className="text-center gowun-dodum-regular">게시글 작성</h3>

                <div className="form-group">
                    <label htmlFor="subject">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        ref={subjectRef}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                        style={{height:'350px'}}
                        className="form-control"
                        id="content"
                        ref={contentRef}
                        rows="6"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                    ></textarea>
                </div>

                <div className="text-center" style={{marginTop:'30px'}}>
                    <button
                        className="btn btn-outline-dark"
                        onClick={boardInsert}
                        disabled={isLoading}
                    >
                        등록
                    </button>
                    <button
                        className="btn btn-secondary ml-2"
                        onClick={() => nav("/board/list")}
                    >
                        목록
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Insert