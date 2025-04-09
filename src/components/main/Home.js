import {Fragment} from "react"
import apiClient from "../../http-commons";
import {useQuery} from "react-query";

function Home() {


    const {isLoading,isError,error,data}=useQuery("main-data",
        async ()=>{
            return await apiClient.get('/movie/main_react')
        }
    )
    if(isLoading) return <h1 className={"text-center"}>데이터 로딩중</h1>
    if(isError)return <h1 className={"text-center"}>{error}</h1>
    console.log(data && data.data)

    return (
        <Fragment>
            <div className="main-banner" style={{"height": "650px"}}>
            </div>
            <div className="popular-categories">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h2>인기 순위</h2>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="naccs">
                                <div className="grid">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="menu">
                                                <div className="first-thumb active">
                                                    <div className="thumb">
                                                <span className="icon"><img src="/images/zero.png"
                                                                            alt=""/></span>
                                                        1위
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="thumb">
                                                <span className="icon"><img src="/images/first.png"
                                                                            alt=""/></span>
                                                        2위
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="thumb">
                                                <span className="icon"><img src="/images/second.jpg"
                                                                            alt=""/></span>
                                                        3위
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="thumb">
                                                <span className="icon"><img src="/images/third.png"
                                                                            alt=""/></span>
                                                        4위
                                                    </div>
                                                </div>
                                                <div className="last-thumb">
                                                    <div className="thumb">
                                                <span className="icon"><img src="/images/last.png"
                                                                            alt=""/></span>
                                                        5위
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 align-self-center">
                                            <ul className="nacc">
                                                {
                                                    data.data.mList && data.data.mList.map((movie)=>

                                                        <li>
                                                            <div>
                                                                <div className="thumb">
                                                                    <div className="row">
                                                                        <div className="col-lg-5 align-self-center">
                                                                            <div className="left-text">
                                                                                <div>
                                                                                    <h4>{movie.mtitle}</h4>
                                                                                    <h6>{movie.mtime}</h6>
                                                                                </div>
                                                                                <p>{movie.msynop}</p>
                                                                                <div className="main-white-button">
                                                                                    <a href="#"><i
                                                                                        className="fa fa-eye"></i>더보기</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-7 align-self-center">
                                                                            <div className="right-image">
                                                                                <img
                                                                                    src={'https://www.kobis.or.kr/' + movie.mposter}
                                                                                    style={{
                                                                                        width: "433px",
                                                                                        height: "500px"
                                                                                    }}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="recent-listing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h2>영화 상점</h2>
                                <h6>Check Them Out</h6>
                            </div>
                        </div>
                        {
                            data.data.msList && data.data.msList.map((vo) =>
                                <div className="col-md-3" style={{"padding": "10px"}}>
                                    <div className="thumbnail">
                                        <a href="/w3images/lights.jpg">
                                            <img src={vo.mgposter} style={{width: "300px", height: "200px"}}/>
                                            <div className="caption">
                                                <p>{vo.mgname}/{vo.mgprice}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Fragment>

    )

}


export default Home;

