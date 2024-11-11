import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import apiClient from "../../http-commons"
import {useState} from "react";

function WeatherRecomm(){
    const {str}=useParams()
    const [curpage, setCurpage]=useState(1)
    const {isLoading,isError,error,data}=useQuery(['weather-recomm',curpage],
        async ()=>{
            return await apiClient.get(`/cloth/weatherComm/${curpage}/${str}`)
        }
    )

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
    console.log(data.data)

    const prev = () => {
        setCurpage(curpage-1)
        // 1 , 11 , 21 => 10 , 20
    }
    const next=()=>{
        setCurpage(curpage+1)
        // 10 20 30 40 ==> 11 21 31 41...
    }
    let pageArr=[]

    return (
        <section id="instagram" className="py-lg-7">
            <div className="container-lg">
                <div className="row" style={{"marginTop": "50px"}}>
                    <div style={{display: "flex", justifyContent: "space-between", position: 'relative'}}>
                        <h1 className="display-2">Weather Recommend!!</h1>
                    </div>

                    <div>
                    </div>
                    {
                        data.data.list && data.data.list.map((vo) =>
                            <div className="col-lg-3 col-md-4 mb-3">
                                <Link to={'/cloth/CodiDetail/' + vo.cno}>
                                    <img src={vo.poster} alt="instagram" className="rounded-4 img-fluid"/>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>


            <div className="pagination-area" style={{marginTop: "150px", textAlign: "center"}}>
                <nav aria-label="#">
                    <ul className="pagination" style={{display: "inline-flex", justifyContent: "center"}}>
                        {
                            data.data && curpage > 1 &&
                            <li className="page-item">
                                <button className="page-link" onClick={prev}><i
                                    className="fa fa-angle-double-left" aria-hidden="true"></i> 이전
                                </button>
                            </li>
                        }
                        &nbsp;
                        <span style={{color: 'olive', fontSize:'20px', marginTop:'5px'}}>
                          {curpage}page / {data.data.totalpage}pages
                        </span>
                        &nbsp;
                        {
                            data.data.totalpage && curpage !== data.data.totalpage &&
                            <li className="page-item">
                                <button className="page-link" onClick={next}>다음 <i
                                    className="fa fa-angle-double-right" aria-hidden="true"></i>
                                </button>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </section>

    )
}

export default WeatherRecomm