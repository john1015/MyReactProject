import {useState, useEffect, Fragment} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import axios from 'axios';
import {Link} from 'react-router-dom'
import {getAll, getCookie, setCookie} from "../util/cookie";
import {useQuery} from "react-query";
import apiClient from "../../http-commons";

function MovieDetail() {
    const cookies=getAll()
    //console.log(cookies)
    const key=Object.keys(cookies) // food_1
    console.log(key)
    const value=Object.values(cookies)
    console.log(value)
    const images=[]
    const keys=[]
    let j=0

    for (let i = key.length - 1; i >= 0; i--) {
        if (key[i].startsWith("movie") && j < 12) {
            images.push(value[i]);
            keys.push(key[i]);
            j++;
        }
    }
    const {mno} = useParams();
    const nav = useNavigate();
    const {isLoading,isError,error,data}=useQuery(["movie_detail",mno],
        async ()=>{
            return await apiClient.get(`/movie/detail/${mno}`)
        }
    )
    if(isLoading) return <h1 className={"text-center"}>데이터 로딩중</h1>
    if(isError)return <h1 className={"text-center"}>{error}</h1>
    console.log(data && data.data)
    // 쿠키 저장
    setCookie("movie_" + mno, 'https://www.kobis.or.kr/' + data.data.mposter)
    return (


        <Fragment>
            <div className="cinema-banner" style={{"height": "150px"}}></div>
            <div style={{"height": "50px"}}></div>

            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>
                </div>
            </div>
            <section className="single_blog_area section_padding_80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8">
                            <div className="row no-gutters">
                                <div className="col-12 col-sm-12">
                                    <div className="related-post-area section_padding_50">
                                        <div className="related-post-slider owl-carousel">
                                        </div>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td width="30%" className="text-center" rowSpan="8">
                                                <img src={'https://www.kobis.or.kr/' + data.data.mposter}
                                                     style={{"width": "100%"}}/>
                                            </td>
                                            <td colSpan="2">
                                                <h3>{data.data.mtitle}&nbsp;<span style={{"color": "orange"}}>{data.data.mrate}</span>
                                                </h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">감독
                                            </td>
                                            <td width="55%">{data.data.mdirector}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">관람등급
                                            </td>
                                            <td width="55%">{data.data.mgrade}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">장르
                                            </td>
                                            <td width="55%">{data.data.mgenre}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">출연진
                                            </td>
                                            <td width="55%">{data.data.mactor}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">개봉일
                                            </td>
                                            <td width="55%">{data.data.mrdate}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">상영시간
                                            </td>
                                            <td width="55%">{data.data.mtime}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">국가
                                            </td>
                                            <td>{data.data.mnation}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table className="table">
                                    <tbody>
                                    <tr>
                                            <td>{data.data.msynop}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ "textAlign": "right" }}>
                                                <Link to="/movie/list" className="btn btn-xs btn-warning"
                                                    style={{"backgroundColor":"yellow"}}
                                                >목록</Link>
                                            </td>
                                        </tr>

                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{"height":"100px"}}></div>
            <div className="container text-center">
                <h3>최근 방문 영화</h3>
                <br/>
                <div className="row">
                    {
                        images && images.map((mposter,index)=>

                        <div className="col-sm-2">
                        <Link to={"/movie/detail/"+keys[index].replace("movie_","")}>
                            <img src={mposter} className="img-responsive"
                                 style={{"width":"200px","height":"300px","padding":"5px"}}
                               />
                         </Link>
                        </div>
                        )
                    }

                </div>
            </div>
            <br/>
        </Fragment>
    )
}

export default MovieDetail;