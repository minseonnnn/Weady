import {Fragment, useEffect} from "react"
import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";
import apiClient from "../../http-commons"
import {useQuery} from "react-query"

function Home() {
    const [mainData, setMainData] = useState([])
    const [weather, setWeather] = useState(null)
    const [mood, setMood] = useState('')
    useEffect(()=>{
        console.log(mood)
    }, [mood])

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleDateString(undefined, options)
    }

    const getSkyDescription = (value) => {
        switch (value) {
            case '1':
                return <span>맑음&nbsp;<i className={"fa-solid fa-sun"} style={{ color: '#F24A00' }}></i></span>
            case '3':
                return <span>흐림&nbsp;<i className={"fa-solid fa-cloud-sun"} style={{ color: '#02BFF2' }}></i></span>
            case '4':
                return <span>구름 많음&nbsp;<i className={"fa-solid fa-cloud-sun"} style={{ color: '#02BFF2' }}></i></span>
            case '0':
                return <span>강수 없음&nbsp;</span>
            case '1':
                return <span>비&nbsp;<i className="fa-solid fa-cloud-rain" style={{color: '#02BFF2'}}></i></span>
            case '2':
                return <span>비/눈&nbsp;<i className={"fa-solid fa-cloud-rain"} style={{ color: '#1E90FF' }}></i></span>
            case '3':
                return <span>눈&nbsp;<i className={"fa-solid fa-snowflake"} style={{ color: '#CFE6F0' }}></i></span>
            case '4':
                return <span>소나기&nbsp;<i className={"fa-solid fa-umbrella"} style={{color: '#3961A8'}}></i></span>
            default:
                return '정보 없음'
        }
    }


    const fetchWeather = async () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const day = ('0' + date.getDate()).slice(-2)
        const initDate = `${year}${month}${day}`

        try {
            const response = await axios.get(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=wBZOMrjXzGWA3OXew5WH2YZMwrMFKbo04AG8U8q5%2FwlvB6%2FHMSjOPtPnCiWwuCMVU6juv6HewEVERJeAy397kA%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${initDate}&base_time=0500&nx=61&ny=120`)
            const items = response.data.response.body.items.item

            const weatherInfo = {
                sky: null,
                maxTemp: null,
                minTemp: null,
                pop: null,
                reh: null,
                time: `${date.getHours()}시`,
            }

            items.forEach(item => {
                if (item.category === 'SKY') {
                    weatherInfo.sky = item.fcstValue
                } else if (item.category === 'TMX') {
                    weatherInfo.maxTemp = item.fcstValue
                } else if (item.category === 'TMN') {
                    weatherInfo.minTemp = item.fcstValue
                } else if (item.category === 'POP') {
                    weatherInfo.pop = item.fcstValue
                } else if (item.category === 'REH') {
                    weatherInfo.reh = item.fcstValue
                }
            })

            setWeather(weatherInfo)
            if(Math.round(weatherInfo.maxTemp)>=28){
                setMood('폭염,홀터넥')
            }
            else if(Math.round(weatherInfo.maxTemp)>=21){
                setMood('린넨')
            }
            else if(Math.round(weatherInfo.maxTemp)>=17){
                setMood('환절기')
            }
            else if(Math.round(weatherInfo.maxTemp)>=7){
                setMood('얼죽코')
            }
            else{
                setMood('한파,방한')
            }
        } catch (error) {
            console.error("Error fetching weather data:", error)
        }
    }

    const {isLoading,isError,data}=useQuery(['main-data'],
        async()=>{
            fetchWeather()
            return await apiClient.get(`/cloth/main_react`)
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




    return (
        <Fragment>
            <section id="intro" className="py-lg-9">
                <div className="container-lg">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6">
                            <div className="image-holder me-5">
                                <img src="/images/bannermain.png" alt="banner" className="img-fluid"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="banner-content">
                                <h1 className="display-2">Today's Weather</h1>
                                <h4 className="noto-sans" style={{
                                    color: 'darkolivegreen',
                                    marginBottom: '15px',
                                    fontWeight: 'bold'
                                }}>{formatDate(new Date())}</h4>
                                {weather && (
                                    <div style={{"marginBottom": "20px"}}>
                                        <h6 className="noto-sans" style={{fontSize: "1.2rem"}}>
                                            현재 날씨: {getSkyDescription(weather.sky)}
                                            {weather.pty !== null && (
                                                <span> / 강수 형태: {getSkyDescription(weather.pty)}</span>
                                            )}
                                        </h6>
                                        <h6 className="noto-sans" style={{fontSize: "1.2rem"}}>
                                            강수확률: {weather.pop}% | 습도: {weather.reh}%<br/>
                                        </h6>
                                        <h6 className="noto-sans" style={{fontSize: "1.2rem"}}>
                                            최고 기온&nbsp;<i className="fa-solid fa-temperature-high"
                                                          style={{color: '#F20303'}}></i>: {weather.maxTemp}°C | 최저
                                            기온&nbsp;<i className="fa-solid fa-temperature-low"
                                                       style={{color: '#0058F2'}}></i>: {weather.minTemp}°C
                                        </h6>
                                    </div>
                                )}
                                <p style={{"marginBottom": "0px"}}>오늘 날씨에 맞는 옷을 확인해보세요!</p>
                                <Link to={'/weather/WeatherReComm/'+mood}
                                      className="btn btn-lg btn-outline-dark btn-bg-primary text-uppercase mt-3 rounded-pill">
                                    <span className="text-uppercase">Today's LookBook</span>
                                    <span width="20px" height="20px" style={{"marginLeft": "5px"}}>➜</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="video-player" className="video overflow-hidden py-lg-9">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-7">
                            <h3 className="display-2" style={{marginTop:'0px'}}>HOT TREND</h3>
                            <div className="video-content">
                                <div className="video-bg position-relative" style={{textAlign: 'center'}}>
                                    <img src="images/fashion" alt="video" className="img-fluid rounded-5"/>
                                    <div
                                        className="player position-absolute d-flex justify-content-center align-items-center">
                                        <a
                                            className="youtube play-btn d-flex justify-content-center align-items-center bg-white-trans rounded-pill"
                                            href="https://www.youtube.com/embed/yhnLkZQvZ6w"
                                        >
                                            <i className="fa fa-play" aria-hidden="true" style={{fontSize: '30px'}}></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="archive-area section_padding_80">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="display-2" style={{marginTop: '0px'}}>TREND NEWS</h3>
                                            <table className="table">
                                                {data.data.nList && data.data.nList.map((news, index) => (
                                                    <tbody key={index}>
                                                    <tr>
                                                        <td>
                                                            <a href={news.link} target="_blank">
                                                                <div>
                                                                    <h6 className="noto-sans"
                                                                        style={{
                                                                            color: 'darkolivegreen',
                                                                            fontWeight: 'bold'
                                                                        }}
                                                                        dangerouslySetInnerHTML={{__html: news.title}}></h6>
                                                                    <b className="noto-sans" style={{height: '70px'}}
                                                                       dangerouslySetInnerHTML={{__html: news.desc}}></b>
                                                                </div>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="instagram" className="py-lg-7">

                <div className="container-lg">
                    <div className="row">
                        <div>
                            <h1 className="display-2">Random Recommend !!</h1>
                        </div>
                        {
                            data.data.cList && data.data.cList.map((cloth) => {
                                return (
                                    <div className="col-lg-3 col-md-4 mb-3">
                                        <Link to={'/cloth/CodiDetail/' + cloth.cno}>
                                            <img src={cloth.poster} alt="instagram" className="rounded-4 img-fluid"/>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Home