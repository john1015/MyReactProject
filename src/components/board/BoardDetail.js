import {Fragment,useState,useEffect} from "react";
import apiClient from "../../http-commons";
import {Link,useParams} from "react-router-dom";
import {useQuery} from "react-query";


function BoardDetail(){
    const {id} = useParams();
    const {isLoading,isError,error,data,refetch:boardDetail} = useQuery(['board-detail',id],
        async ()=>{
        return await apiClient.get(`/board/detail_react/${id}`)
        }
    )
    useEffect(()=>{
        boardDetail()
    },[id])
    if(isLoading) return <h1 className={"text-center"}>서버에서 데이터 전송 지연 ...</h1>
    if(isError) return <h1 className={"text-center"}>{error}</h1>


    return (
        <Fragment>
            <div style={{"backgroundColor": "gray", "height": "150px"}}></div>
            <div style={{"height": "25px"}}></div>
            <div className="breadcumb-area" style={{"background-image": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>상세보기</h2>
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

            <section className="archive-area section_padding_80" id="listApp">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            {/*화면 출력위치*/}
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <th style={{"width": "20%"}} className={"text-center"}>번호</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.id}</td>
                                    <th style={{"width": "20%"}} className={"text-center"}>작성일</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.regdate}</td>
                                </tr>
                                <tr>
                                    <th style={{"width": "20%"}} className={"text-center"}>이름</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.name}</td>
                                    <th style={{"width": "20%"}} className={"text-center"}>조회수</th>
                                    <td style={{"width": "30%"}} className={"text-center"}>{data.data.hit}</td>
                                </tr>
                                <tr>
                                    <th style={{"width": "20%"}} className={"text-center"}>제목</th>
                                    <td style={{"width": "30%"}} colSpan={"3"}>{data.data.subject}</td>
                                </tr>
                                <tr>
                                    <td colSpan={"4"} className={"text-left"} valign={"top"} height={"200"}>
                                        <pre style={{
                                            "whiteSpage": "preWrap",
                                            "backgroundColor": "white",
                                            "border": "none"
                                        }}>{data.data.content}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={"4"} className={"text-right"}>
                                        <Link to={"/board/update/" + id} className={"btn btn-xs btn-primary"}>수정</Link>
                                        <Link to={"/board/delete/" + id} className={"btn btn-xs btn-danger"}>삭제</Link>
                                        <Link to={"/board/list"} className={"btn btn-xs btn-success"}>목록</Link>
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

export default BoardDetail;