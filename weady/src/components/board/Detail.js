import {Fragment, useEffect, useState} from "react"
import {Link,useParams,useNavigate} from "react-router-dom"
import {useMutation, useQuery} from "react-query"
import apiClient from "../../http-commons"
function Detail(){
    const {id} = useParams()
    const navigate = useNavigate();
    const [sessionId, setSessionId] = useState(window.sessionStorage.getItem("id")||'')
    const {isLoading,isError,data,refetch:boardDetail}=useQuery(['board-detail',id],
        async ()=>{
            return await apiClient.get(`/board/detail/${id}`)
        }
    )
    const deleteBoard=useMutation(
        async ()=> {
            await apiClient.delete(`board/delete/${id}`)
        },{
            onSuccess:()=>{
                boardDetail()
                navigate("/board/list")
            }
        }

    )
    useEffect(() => {
        boardDetail()
    }, [id]);
    if (isLoading) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
        <img src="/css/ajax-loader.gif" alt="Loading..."/><br/>
        <p>Loading...</p>
    </div>
    console.log(sessionId)
    if (isError) return <div>Error loading data</div>
    console.log(data.data)

    return (
        <div className="container" style={{marginTop: "150px", marginBottom: "250px"}}>
            <div className="freeboard-box p-4">
                <h3 className="text-center gowun-dodum-regular">게시글 상세보기</h3>
                <table className="table table-custom">
                    <tbody>
                    <tr>
                        <th style={{width: "20%", textAlign: "center"}}>번호</th>
                        <td style={{width: "30%", textAlign: "center"}}>{data.data.id}</td>
                        <th style={{width: "20%", textAlign: "center"}}>작성일</th>
                        <td style={{width: "30%", textAlign: "center"}}>{data.data.regdate}</td>
                    </tr>
                    <tr>
                        <th style={{width: "20%", textAlign: "center"}}>이름</th>
                        <td style={{width: "30%", textAlign: "center"}}>{data.data.name}</td>
                        <th style={{width: "20%", textAlign: "center"}}>조회수</th>
                        <td style={{width: "30%", textAlign: "center"}}>{data.data.hit}</td>
                    </tr>
                    <tr>
                        <th style={{width: "20%", textAlign: "center"}}>제목</th>
                        <td style={{width: "30%", textAlign: "left"}} colSpan="3">{data.data.subject}</td>
                    </tr>
                    <tr>
                        <td colSpan="4" style={{
                            textAlign: "left",
                            whiteSpace: "pre-wrap",
                            backgroundColor: "white",
                            border: "1px solid #ddd",
                            padding: "10px",
                            height: "200px",
                            wordBreak: "break-word"
                        }}>
                            {data.data.content}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4" style={{textAlign: "right"}}>
                            {
                                sessionId === data.data.userid ? (
                                    <Fragment>
                                        <Link to={`/board/update/${id}`}
                                              style={{
                                                  fontSize: "12px",
                                                  padding: "5px 10px",
                                                  border: "1px solid #4e5b31",
                                                  borderRadius: "5px",
                                                  color: "#4e5b31",
                                                  textDecoration: "none"
                                              }}>수정</Link>
                                        <button style={{
                                            fontSize: "12px",
                                            padding: "5px 10px",
                                            border: "1px solid #d9534f",
                                            borderRadius: "5px",
                                            backgroundColor: "transparent",
                                            color: "#d9534f"
                                        }}
                                                onClick={() => deleteBoard.mutate()}>삭제
                                        </button>
                                    </Fragment>
                                ) : null
                            }
                            <Link to="/board/list"
                                  style={{
                                      fontSize: "12px",
                                      padding: "5px 10px",
                                      border: "1px solid #ccc",
                                      borderRadius: "5px",
                                      color: "#ccc",
                                      textDecoration: "none"
                                  }}>목록</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Detail