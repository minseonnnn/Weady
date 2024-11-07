import {useState} from 'react';
import {useQuery} from "react-query";
import apiClient from "../../http-commons"
import {Link} from 'react-router-dom';

function Shop(){
    const [curpage,setCurpage] = useState(1);
    const [search, setSearch]=useState('')
    const [hoveredItem, setHoveredItem] = useState(null);
    const [fd, setFd] = useState('*');
    const {isLoading,isError,data,refetch:itemFindData}=useQuery(["item_find",curpage,fd],
        async ()=>{
            return await apiClient.get(`/item/find/${curpage}/${fd}`)
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

    const findBtn=()=>{
        itemFindData()
    }

    const pageChange=(page)=>{
        setCurpage(page)
    }
    const prev=()=>{
        setCurpage(data.data.startPage-1)
    }
    const next=()=>{
        setCurpage(data.data.endPage+1)
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
    return (

        <section id="instagram" className="py-lg-7" style={{marginTop: "80px", alignItems: "center"}}>

            <div className="container-lg">
                <div className="row" style={{marginTop: "50px", alignItems: "center"}}>
                    <div className="col" style={{marginTop: "-200px"}}>
                        <h1 className="display-2">Shop</h1>

                        <div className="col-auto" style={{marginLeft: 'auto'}}>
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    width: '250px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s',
                                }}
                                onKeyUp={(e)=>{
                                    if(e.key==='Enter'){
                                        if(search.trim()===''){
                                            setFd('*')
                                        }
                                        else{
                                            setFd(search)
                                        }
                                    }
                                    else{
                                        setSearch(e.target.value)
                                    }
                                }}
                            />
                            <button
                                onClick={findBtn}
                                className={"btn btn-xs btn-dark"}
                                style={{
                                    marginLeft: '10px',
                                    borderRadius: '7px',
                                    padding: '10px 20px'
                                }}>
                                Search
                            </button>
                        </div>
                    </div>
                    {
                        data.data.list && data.data.list.map((vo) => (
                        <div className="col-lg-3 col-md-4 mb-3" key={vo.ino}
                             style={{position: 'relative',margin: '0px', padding : '0px'}}
                             onMouseEnter={() => setHoveredItem(vo.name)}
                             onMouseLeave={() => setHoveredItem(null)}>
                            <Link to={'/shop/Shopdetail/'+vo.ino} style={{height: "367.21px", width: "305.99px"}}>
                                <img
                                    src={vo.photo}
                                    alt="instagram"
                                    style={{height: "367.21px", width: "305.99px", display: 'block', margin: '0px'}}
                                    className="rounded-4 img-fluid"
                                />
                            </Link>
                            {hoveredItem === vo.name && (
                                <Link to={'/shop/Shopdetail/'+vo.ino} style={{height: "367.21px", width: "305.99px"}}>
                                    <div className="overlay" style={{
                                        position: 'absolute',
                                        top: 0,
                                        width: "305.99px",
                                        height: "367.21px",
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        color: 'white',
                                        zIndex: 1,
                                        borderRadius: '1rem'
                                    }}>
                                    <span style={{
                                        marginBottom: '15px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '90%',
                                        textAlign: 'center'
                                    }}>{vo.name}</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="pagination-area" style={{marginTop: "150px", textAlign: "center"}}>
                <nav aria-label="#">
                    <ul className="pagination" style={{display: "inline-flex", justifyContent: "center"}}>
                        {
                            data.data.startPage && data.data.startPage > 1 &&
                            <li className="page-item">
                                <button className="page-link" onClick={prev}><i className="fa fa-angle-double-left"
                                                                                aria-hidden="true"></i> 이전
                                </button>
                            </li>
                        }
                        {pageArr}
                        {
                            data.data.endPage && data.data.endPage < data.data.totalpage &&
                            <li className="page-item">
                                <button className="page-link" onClick={next}>다음
                                    <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </section>

    )
}

export default Shop