import {useState, useEffect, Fragment} from 'react'
import apiClient from "../../http-commons"
import {Link} from "react-router-dom";
import {useQuery} from "react-query"

function BoardList() {
    // 데이터를 받는 위치
    const[curpage, setCurpage] = useState(1)
    const {isLoading,isError,error,data,refetch:loadingNotIncrement}=useQuery(['board-list',curpage],
        async ()=>{
            return await apiClient.get(`/board/list_react/${curpage}`)
         }
    )
    useEffect(()=>{
        loadingNotIncrement()
    },[isLoading])

    if(isLoading) return <h1 className={"text-center"}>서버에서 데이터 전송 지연 ...</h1>
    if(isError) return <h1 className={"text-center"}>{error}</h1>

    const prev=()=>{
        // 현재 페이지를 변경 => setCurpage => useEffect() 재호출
        setCurpage(curpage>1?curpage-1:curpage);
    }
    const next=()=>{
        //
        setCurpage(curpage<data.data.totalapge?curpage+1:curpage)
    }
    return (
        <Fragment>
            <div style={{"backgroundColor": "gray", "height": "150px"}}></div>
            <div style={{ "height": "25px"}}></div>
            <div className="breadcumb-area" style={{"background-image": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>자유게시판</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">

                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <section className="archive-area section_padding_80" id="listApp" >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <Link to={"/board/insert"} className={"btn btn-sm btn-warning"}>새글</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className={"table table-striped"} style={{"backgroundColor": "whitesmoke"}}>
                                <thead>
                                    <tr style={{"backgroundColor":"linen"}}>
                                        <th className="text-center" width={"10%"} >번호</th>
                                        <th className="text-center" width={"45%"}>제목</th>
                                        <th className="text-center" width={"15%"}>이름</th>
                                        <th className="text-center" width={"20%"}>작성일</th>
                                        <th className="text-center" width={"10%"}>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {/*게시물 출력 위치*/}
                                {
                                    data.data.list && data.data.list.map((vo) =>
                                        <tr>
                                            <td className="text-center" width={"10%"}>{vo.id}</td>
                                            <td width={"45%"}>{
                                                data.data.today===vo.regdate &&
                                                <sup><img src={"../images/new.gif"} style={{"width":"25px","height":"10px"}}/></sup>
                                            }
                                                &nbsp; <Link to={"/board/detail/"+vo.id}>{vo.subject}</Link>
                                            </td>
                                            <td className="text-center" width={"15%"}>{vo.name}</td>
                                            <td className="text-center" width={"20%"}>{vo.regdate}</td>
                                            <td className="text-center" width={"10%"}>{vo.hit}</td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        <button className={"btn btn-sm btn-primary"} onClick={prev}>이전</button>
                                        {data.data.curpage} page / {data.data.totalapge} pages
                                        <button className={"btn btn-sm btn-primary"} onClick={next}>다음</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default BoardList