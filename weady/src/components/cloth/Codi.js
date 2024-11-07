import {useState} from "react";
import {useQuery} from "react-query";
import apiClient from "../../http-commons"
import {Link} from "react-router-dom";
import {getAll} from '../util/cookie';

function Codi(){
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedStyle, setSelectedStyle] = useState('ALL')
    const [showOptions, setShowOptions] = useState(false)
    const [curpage, setCurpage] = useState(1);
    const {isLoading,isError,data}=useQuery(["cloth_list",curpage, selectedStyle],
        // 서버 연결
        async ()=>{
            return await apiClient.get(`/cloth/list/${curpage}/${selectedStyle}`)
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
    if (isError) return <h3 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>Error loading data..</h3>

    const pageChange = (page) => {
        setCurpage(page)
    }
    const prev = () => {
        setCurpage(data.data.startPage-1)
        // 1 , 11 , 21 => 10 , 20
    }
    const next=()=>{
        setCurpage(data.data.endPage+1)
        // 10 20 30 40 ==> 11 21 31 41...
    }
    let pageArr=[]
    for (let i = data.data.startPage; i <= data.data.endPage; i++) {
        if (curpage === i) {
            pageArr.push(
                <li className="page-item active">
                    <button className="page-link" onClick={() => pageChange(i)}>{i}</button>
                </li>
            )
        } else {
            pageArr.push(
                <li className="page-item">
                    <button className="page-link" onClick={() => pageChange(i)}>{i}</button>
                </li>
            )
        }

    }

    const cookies=getAll()
    const key=Object.keys(cookies)
    const value=Object.values(cookies)
    const images=[]
    const keys=[]
    let j=0

    for(let i=key.length-1;i>=0;i--)
    {
        if(key[i].startsWith('codi_') && j<4)
        {
            images.push(value[i])
            keys.push(key[i])
            j++
        }

    }

    const styles = ['캐주얼', '아메카지', '걸리시', '비즈니스캐주얼', '시크', '댄디', '빈티지' , '미니멀', '유니크', '메탈릭', '레더' , '모노톤']

    const handleStyleClick = () => {
        setShowOptions(!showOptions);
    }

    const handleOptionSelect = (style) => {
        setSelectedStyle(style)
        setCurpage(1)
        setShowOptions(false)
    }

    return (
        <section id="instagram" className="py-lg-7">
            <div className="container-lg">
                <div className="row" style={{"marginTop": "50px"}}>
                    <div style={{display: "flex", justifyContent: "space-between", position: 'relative'}}>
                        <h1 className="display-2">Codi</h1>
                        <div>
                            {selectedStyle && <button className="btn btn-outline-dark">
                                #&nbsp;{selectedStyle}
                            </button>}
                            <button onClick={handleStyleClick} className="btn btn-dark">
                                스타일 ▼
                            </button>
                            {showOptions && (
                                <div className="d-flex" style={{
                                    marginTop: '10px',
                                    flexWrap: 'nowrap',
                                    whiteSpace: 'nowrap',
                                    position: 'absolute',
                                    right: 0
                                }}>
                                    {styles.map((style) => (
                                        <button
                                            className="btn btn-link mx-1"
                                            onClick={() => handleOptionSelect(style)}
                                            key={style}>
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                    </div>
                    {
                        data.data.cList && data.data.cList.map((vo) =>
                                <div className="col-lg-3 col-md-4 mb-3">
                                    <Link to={'/cloth/CodiDetail/' + vo.cno}>
                                        <img src={vo.poster} alt="instagram" className="rounded-4 img-fluid"/>
                                    </Link>
                                </div>
                        )
                    }
                </div>
            </div>


            <div className="col-lg-3">
                <div className="recent-codi-container" style={{marginTop: '500px'}}>
                    <div className="recent-codi-header" onClick={() => setIsExpanded(!isExpanded)}>
                            <h6 className="noto-sans" style={{marginBottom: '0px'}}>최근 본 코디</h6>
                        <span className="toggle-icon">{isExpanded ? '-' : '+'}</span>
                    </div>
                    {isExpanded && (
                        <div className="recent-codi-content">
                            <ul>
                                { images && images.map((poster, index) => (
                                    <li key={index}>
                                        <figure>
                                            <Link to={"/cloth/CodiDetail/"+keys[index].replace("codi_", "")}>
                                                <img className="radius-10 btmspace-10" src={poster}
                                                     style={{width: "60px", height: "80px"}}/>
                                            </Link>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="pagination-area" style={{marginTop: "150px", textAlign: "center"}}>
                <nav aria-label="#">
                    <ul className="pagination" style={{display: "inline-flex", justifyContent: "center"}}>
                        {
                            data.data.startPage && data.data.startPage > 1 &&
                            <li className="page-item">
                                <button className="page-link" onClick={prev}><i
                                    className="fa fa-angle-double-left" aria-hidden="true"></i> 이전
                                </button>
                            </li>
                        }
                        {pageArr}
                        {
                            data.data.endPage && data.data.endPage < data.data.totalpage &&
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

export default Codi