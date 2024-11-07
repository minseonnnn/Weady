import {useState} from 'react';
import {useQuery} from "react-query";
import apiClient from "../../http-commons"
import {Link} from 'react-router-dom';

function SeasonBest() {
    const today = new Date();
    const month = today.getMonth() + 1;

    let initialSeason = '';
    if (month >= 3 && month <= 5) {
        initialSeason = '봄';
    } else if (month >= 6 && month <= 8) {
        initialSeason = '여름';
    } else if (month >= 9 && month <= 11) {
        initialSeason = '가을';
    } else {
        initialSeason = '겨울';
    }

    const [selectedSeason, setSelectedSeason] = useState(initialSeason);
    const [showOptions, setShowOptions] = useState(false);

    const {isLoading,isError,data}=useQuery(["season_list",selectedSeason],
        // 서버 연결
        async ()=>{
            return await apiClient.get(`/cloth/season/${selectedSeason}`)
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


    const handleStyleClick = () => {
        setShowOptions(!showOptions)
    }

    const handleOptionSelect = (season) => {
        setSelectedSeason(season)
        setShowOptions(false)
    }

    const styles = ['봄', '여름', '가을', '겨울']

    return (
        <section id="instagram" className="py-lg-7">
            <div className="container-lg">
                <div className="row" style={{ marginTop: "50px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", position: 'relative' }}>
                        <h1 className="display-2">Season Best 100</h1>
                        <div>
                            {selectedSeason && <button className="btn btn-outline-dark">
                                #&nbsp;{selectedSeason}
                            </button>}
                            <button onClick={handleStyleClick} className="btn btn-dark">
                                계절 ▼
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
                        data.data.list && data.data.list.map((vo) => {
                            return (
                                <div className="col-lg-3 col-md-4 mb-3" key={vo.cno}>
                                    <Link to={'/cloth/CodiDetail/' + vo.cno}>
                                        <img src={vo.poster} alt="instagram" className="rounded-4 img-fluid" />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default SeasonBest
