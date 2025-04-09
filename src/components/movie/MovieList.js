import {Fragment, useState} from "react";
import {useQuery} from "react-query";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";

function MovieList() {
    const [curpage, setCurpage] = useState(1);
    const {isLoading,isError,error,data}=useQuery(["movie_list",curpage],
        async ()=>{
            return await apiClient.get(`/movie/list/${curpage}`)
        }
    )
    if(isLoading) return <h1 className={"text-center"}>데이터 로딩중</h1>
    if(isError)return <h1 className={"text-center"}>{error}</h1>
    console.log(data && data.data)

    let prev = () => {
        setCurpage(data.data.startPage - 1);
    }
    let next = () => {
        setCurpage(data.data.endPage + 1);
    }
    let pageChange = (page) => {
        setCurpage(page);
    }
    let pageArr = []
    for (let i = data.data.startPage; i <= data.data.endPage; i++) {
        if (curpage == i) {
            pageArr.push(
                <li className={"page-item active"}>
                    <button className={"page-link"} onClick={() => pageChange(i)}>{i}</button>
                </li>
            );
        } else {
            pageArr.push(
                <li className={"page-item"}>
                    <button className={"page-link"} onClick={() => pageChange(i)}>{i}</button>
                </li>
            )
        }
    }
    return (
        <Fragment>
            <div className="cinema-banner" style={{"height": "150px"}}></div>
            <div className="recent-listing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h2>영화 목록</h2>
                            </div>
                        </div>
                        {
                            data.data.list && data.data.list.map((vo) =>
                                <div className="col-lg-6">
                                    <div>
                                        <div className="item">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="listing-item">
                                                        <div className="left-image">
                                                            <Link href="#"><img src="assets/images/listing-01.jpg"
                                                                                alt=""/></Link>
                                                        </div>
                                                        <div className="right-content align-self-center">
                                                            <Link href="#"><h4>{vo.mtitle}</h4></Link>
                                                            <h6>{vo.mgenre}</h6>
                                                            <ul className="rate">
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li>{vo.mrate}</li>
                                                            </ul>
                                                            <img src={'https://www.kobis.or.kr/' + vo.mposter}
                                                                 style={{"width": "200px", "height": "250px"}}/>
                                                            <div className="main-white-button">
                                                                <Link to={"/movie/detail/"+vo.mno}>
                                                                    <i className="fa fa-eye"></i> Contact Now
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-12"
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div className="pagination-area d-sm-flex mt-15">
                            <nav aria-label="#">
                                <ul className="pagination">
                                    {data.data.startPage && data.data.startPage > 1 && (
                                        <li className="page-item">
                                            <button className="page-link" onClick={prev}>
                                                <i className="fa fa-angle-double-left" aria-hidden="true"></i> 이전
                                            </button>
                                        </li>
                                    )}
                                    {pageArr}
                                    {data.data.endPage && data.data.endPage < data.data.totalpage && (
                                        <li className="page-item">
                                            <button className="page-link" onClick={next}>
                                                다음 <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                                <div className="page-status text-center" style={{"marginTop": "20px"}}>
                                    <p>{data.data.curpage} page / {data.data.totalpage} pages</p>
                                </div>
                            </nav>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MovieList;