import {useQuery} from "react-query";
import {useEffect, useState,Fragment} from 'react'
import {Link} from "react-router-dom";
import apiClient from "../../http-commons"

function List(){
    const [curpage, setCurpage] = useState(1)
    const {isLoading,isError,error,data,refetch:loadingNotExecute}=useQuery(['board-list',curpage],
        async ()=>{
            return await apiClient.get(`/board/list/${curpage}`)
        }
    )

    useEffect(()=>{
        loadingNotExecute()
    },[isLoading])

    if (isLoading) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
        <img src="/css/ajax-loader.gif" alt="Loading..."/><br/>
        <p>Loading...</p>
    </div>
    if (isError) return <div>Error loading data</div>

    const prev=()=>{
        setCurpage(curpage>1?curpage-1:curpage)
    }
    const next=()=>{
        setCurpage(data.data.totalpage && curpage<data.data.totalpage?curpage+1:curpage)
    }

    return (
            <div className="freeboard-box p-4" style={{marginTop:'150px',marginBottom:"350px"}}>
                <h3 className="text-center gowun-dodum-regular">자유게시판</h3>
                <div>
                    <section className="archive-area">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="mb-3 text-right">
                                    <Link to={"/board/insert"} className="btn btn-custom">새글</Link>
                                </div>
                                <table className="table table-custom">
                                    <thead>
                                    <tr>
                                        <th className="text-center" width="10%">번호</th>
                                        <th className="text-center" width="45%">제목</th>
                                        <th className="text-center" width="15%">작성자</th>
                                        <th className="text-center" width="20%">작성일</th>
                                        <th className="text-center" width="10%">조회수</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* 게시물 목록 출력 */}
                                    {data.data.list && data.data.list.map((vo, index) => (
                                        <tr key={vo.id}>
                                            <td className="text-center">{data.data.count-index}</td>
                                            <td>
                                                <Link to={`/board/detail/${vo.id}`}
                                                      className="board-link">{vo.subject}</Link>
                                            </td>
                                            <td className="text-center">{vo.name}</td>
                                            <td className="text-center">{vo.regdate}</td>
                                            <td className="text-center">{vo.hit}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            <button className="btn btn-sm btn-custom" onClick={prev}>이전</button>
                                            {data.data.curpage} page / {data.data.totalpage} pages
                                            <button className="btn btn-sm btn-custom" onClick={next}>다음</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

    )
}

export default List