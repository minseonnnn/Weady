import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import apiClient from "../../http-commons"
import {useQuery} from "react-query";
import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useEffect} from "react";

//import {getCookie,setCookie} from "../util/cookie";

function Shopdetail() {
const {ino} = useParams();
const nav = useNavigate();
const {isLoading,isError,data,refetch:itemDetail} = useQuery(['shopDetail',ino],
    async ()=>{
        return await apiClient.get(`/item/detail/${ino}`)
    }
)
useEffect(() => {
        itemDetail()}, [ino])
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

    const isLongText = data.data.vo.name && data.data.vo.name.length > 23
    const handleGoBack = () => {
        nav(-1)
    }

    return (

        <section className="single-product py-lg-6">
            <div className="container-lg" style={{"marginTop": "100px"}}>
                <div className="row g-0">
                    <div className="col-lg-5 col-md-12">
                        <div className="image-holder" id="product-detail">
                            <img src={data.data.vo.photo} alt="product-large"
                                 className="rounded-top-left rounded-bottom-left"
                                 style={{width: "100%", height: "100%"}}/>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-12 bg-secondary rounded-top-right rounded-bottom-right">
                        <div className="product-info py-lg-6-i px-5" style={{"paddingBottom": "10px"}}>
                            <div className="display-header">
                                <h6 className="noto-sans" style={{textAlign: "right"}}>👁️‍🗨️{data.data.vo.hit}</h6>
                                <h4 className="noto-sans">{data.data.vo.brandname}</h4>
                                <div className="scrollable-text">
                                    <h2
                                        itemProp="name"
                                        className="display-5 jua-regular"
                                        data-long={isLongText}
                                    >
                                        {data.data.vo.name}
                                    </h2>
                                </div>
                            </div>
                            <div className="product-action">
                                <div className="detail-list">
                                    <ul className="text-light list-unstyled mb-0">
                                        <h4 className="price noto-sans"
                                            style={{"fontWeight": "bold"}}>
                                            Price - {data.data.vo.price ? data.data.vo.price.toLocaleString() : '가격 정보 없음'}원
                                        </h4>
                                    </ul>
                                </div>
                                <h5 className="gowun-dodum-regular"
                                    style={{"fontWeight": "bold", "marginTop": "50px", "marginBottom": "20px"}}>
                                    이 상품을 활용한 코디 추천
                                </h5>
                                <Swiper
                                    style={{"marginTop": "30px"}}
                                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                    loop={true}
                                    spaceBetween={10} // 이미지 사이 공간
                                    slidesPerView={4} // 이미지 개수
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                    autoplay={{delay: 2000, disableOnInteraction: false}}
                                >
                                    {data.data.list && data.data.list.map((vo) => {
                                        return (
                                            <SwiperSlide>
                                                <div className="categories">
                                                    <Link to={'/cloth/CodiDetail/${vo.cno}'}>
                                                        <img src={vo.poster} width={'90%'} height={'90%'}
                                                             style={{"borderRadius": "0.8em"}} alt={''}/>
                                                        <h5>{vo.name}</h5>
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                <div className="text-end mt-3">
                                    <button onClick={handleGoBack} className="btn-arrow" aria-label="이전 페이지로 이동">
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

export default Shopdetail