import {useParams, useNavigate, Link} from "react-router-dom";
import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {getCookie,setCookie} from "../util/cookie";
import apiClient from "../../http-commons"
import {useQuery} from "react-query";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useEffect} from "react";
function CodiDetail(){
    const {cno} = useParams();
    const nav = useNavigate();
    const {isLoading,isError,data,refetch:codiDetail} = useQuery(['codiDetail',cno],
        async ()=>{
            return await apiClient.get(`/cloth/detail/${cno}`)
        }
    )
    useEffect(() => {
        codiDetail()
    }, [cno])
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

    setCookie("codi_"+cno,data.data.vo.poster)

    const handleGoBack = () => {
        nav(-1)
    }

    return (
        <section className="single-product py-lg-6">
            <div className="container-lg" style={{"marginTop": "100px"}}>
                <div className="row g-0">
                    <div className="col-lg-5 col-md-12">
                        <div className="image-holder" id="product-detail">
                            <img
                                src={data.data.vo.poster}
                                alt="product-large"
                                className="rounded-top-left rounded-bottom-left"
                                style={{
                                    width: "auto",
                                    height: "800px",
                                    objectFit: "contain",
                                    display: "block",
                                    justifySelf: "right"
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-12 bg-secondary rounded-top-right rounded-bottom-right">
                        <div className="product-info py-lg-6-i px-5" style={{"paddingBottom": "10px"}}>
                            <div className="display-header">
                            <h6 className="noto-sans" style={{textAlign: "right"}}>👁️‍🗨️{data.data.vo.hit}</h6>
                                <h4 className="noto-sans" style={{"fontWeight": "bold"}}>{data.data.vo.season}&nbsp;코디</h4>
                            </div>
                            <div className="product-action">
                                <div className="detail-list" style={{"marginTop": "40px"}}>
                                    <ul className="text-light list-unstyled mb-0">
                                        <h5 className="noto-sans" style={{"fontWeight": "bold"}}>
                                            #해시태그
                                        </h5>
                                        <h5 className="price noto-sans" style={{"marginTop": "10px"}}>
                                            {data.data.vo.tag}
                                        </h5>
                                    </ul>
                                </div>

                                <h5 className="gowun-dodum-regular"
                                    style={{"fontWeight": "bold", "marginTop": "50px", "marginBottom": "20px"}}>
                                    이 코디와 연관된 상품
                                </h5>
                                <Swiper
                                    style={{"marginTop": "30px"}}
                                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                    loop={true}
                                    spaceBetween={25} // 이미지 사이 공간
                                    slidesPerView={3} // 이미지 개수
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                    autoplay={{delay: 2000, disableOnInteraction: false}}
                                >
                                    {data.data.list && data.data.list.map((vo) => {
                                        return (
                                            <SwiperSlide key={vo.ino}>
                                                <div className="categories">
                                                    <Link to={`/shop/Shopdetail/${vo.ino}`}>
                                                        <img src={vo.photo} width={'100%'} height={"300px"} style={{ borderRadius: "0.8em", marginBottom: "10px"}} alt={''} />
                                                        <h5 className="gowun-dodum-regular"
                                                            style={{
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                maxWidth: '98%' // 원하는 최대 너비 설정
                                                            }}>
                                                            {vo.name}</h5>
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                <div className="text-end mt-3">
                                    <button onClick={handleGoBack} className="btn-arrow" aria-label="이전 페이지로 이동" style={{"marginTop": "20px"}}>
                                        <i className="fas fa-arrow-left"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default CodiDetail