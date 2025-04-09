import {Fragment, useState} from "react";
import {useQuery} from "react-query";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";

function StoreList() {
    const [curpage, setCurpage] = useState(1);
    const {isLoading,isError,error,data}=useQuery(["moviestore_list",curpage],
        async ()=>{
            return await apiClient.get(`/store/list/${curpage}`)
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
            <div className="store-banner" style={{"height": "200px"}}></div>
            <div className="recent-listing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h2>상점</h2>
                            </div>
                        </div>
                        {
                            data.data.list && data.data.list.map((vo) =>
                                <div className="col-md-3" style={{"padding":"10px"}}>
                                    <div className="thumbnail">
                                        <a href="/w3images/lights.jpg">
                                            <Link to={"/store/detail/"+vo.mgno}>
                                                <img src={vo.mgposter} style={{width: "300px", height: "200px"}}/>
                                                <div className="caption">
                                                    <p className={"text-center"}>{vo.mgname}</p>
                                                    <p className={"text-center"}>{vo.mgprice}</p>
                                                </div>
                                            </Link>
                                        </a>
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

export default StoreList;