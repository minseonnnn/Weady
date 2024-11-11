import {Fragment,useState,useRef} from "react";
import {useParams,useNavigate} from "react-router-dom";
import apiClient from "../../http-commons"
import {useQuery,useMutation} from "react-query";

function Update(){
    const boardUpdate=()=>{
        if(subject.trim()===""){
            subjectRef.current.focus()
            return
        }
        else if(content.trim()==="")
        {
            contentRef.current.focus()
            return
        }
        boardUpdateOk()
    }

    const [subject,setSubject]=useState("")
    const [content,setContent]=useState("")
    const subjectRef=useRef(null)
    const contentRef = useRef(null)
    const nav=useNavigate()
    const {id}=useParams()

    const {isLoading,isError,data}=useQuery(['board-update',id],
        async ()=>{
            return await apiClient.get(`/board/update/${id}`)
        },
        {
            onSuccess:(res)=>{
                console.log(res.data)
                setSubject(res.data.subject)
                setContent(res.data.content)
            },
            onError:(err)=>{
                console.log(err.response)
            }
        }
    )

    const {mutate:boardUpdateOk}=useMutation(
        async () =>{
            return await apiClient.put(`/board/update_ok`,{
                id:id,
                subject:subject,
                content:content
            })
        },
        {
            onSuccess: (res) => {
                    window.location.href = "/board/detail/" + id

            }
        }
    )
    return (

        <div className="container" style={{marginTop: "150px", marginBottom: "250px"}}>
            <div className="freeboard-box p-4">
                <h3 className="text-center gowun-dodum-regular">게시글 수정</h3>

                <div className="form-group">
                    <label htmlFor="subject">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={subject}
                        ref={subjectRef}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                        style={{height: '350px'}}
                        className="form-control"
                        id="content"
                        ref={contentRef}
                        rows="6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div className="text-center" style={{marginTop: '30px'}}>
                    <button className={"btn btn-outline-dark"} onClick={boardUpdate}>수정</button>
                    <button className={"btn btn-secondary"} onClick={() => nav(-1)}>취소</button>
                </div>
            </div>
        </div>

    )
}

export default Update