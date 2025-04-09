import {useState, useEffect, Fragment} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import axios from 'axios';
import {Link} from 'react-router-dom'
import {getAll, getCookie, setCookie} from "../util/cookie";
import {useQuery} from "react-query";
import apiClient from "../../http-commons";

function StoreDetail() {
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
        if (key[i].startsWith("store") && j < 12) {
            images.push(value[i]);
            keys.push(key[i]);
            j++;
        }
    }
    const {mgno} = useParams();
    const nav = useNavigate();
    const {isLoading,isError,error,data}=useQuery(["movie_store_detail",mgno],
        async ()=>{
            return await apiClient.get(`/store/detail/${mgno}`)
        }
    )
    if(isLoading) return <h1 className={"text-center"}>데이터 로딩중</h1>
    if(isError)return <h1 className={"text-center"}>{error}</h1>
    console.log(data && data.data)
    // 쿠키 저장
    setCookie("store_" + mgno, data.data.mgposter)
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
                                                <img src={data.data.mgposter}
                                                     style={{"width": "250px","height":"350px"}}/>
                                            </td>
                                            <td colSpan="2">
                                                <h3>{data.data.mtitle}&nbsp;<span style={{"color": "orange"}}>{data.data.mrate}</span>
                                                </h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">상품명
                                            </td>
                                            <td width="55%">{data.data.mgname}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">가격
                                            </td>
                                            <td width="55%">{data.data.mgprice}</td>
                                        </tr>

                                         <tr>
                                             <td style={{"color":"gray"}} className={"text-center"}>
                                                 수량
                                             </td>
                                             <td colSpan={"2"}>
                                                 <select className={"input-group-sm"} style={{"width": "350px"}} >
                                                     <option value={"1"} selected>1개</option>
                                                     <option value={"2"} >2개</option>
                                                     <option value={"3"} >3개</option>
                                                     <option value={"4"} >4개</option>
                                                     <option value={"5"} >5개</option>
                                                 </select>
                                             </td>
                                         </tr>
                                        <tr className="text-right">

                                             <td colSpan={"4"} style={{"textAlign":"right"}}>
                                                 <button className={"btn btn-sm btn-info"} style={{"margin":"2px"}}>찜하기</button>
                                                 <button className={"btn btn-sm btn-warning"} style={{"margin":"2px"}}>장바구니</button>
                                                 <button className={"btn btn-sm btn-danger"} style={{"margin":"2px"}}>구매하기</button>
                                                 <Link to={"/store/list"} className={"btn btn-sm btn-primary"} style={{"margin":"2px"}} >목록</Link>
                                             </td>
                                         </tr>
                                        </tbody>
                                    </table>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <img src={data.data.mgdetail} />
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
                <h3>최근 방문 목록</h3>
                <br/>
                <div className="row">
                    {
                        images && images.map((mgposter,index)=>

                            <div className="col-sm-2">
                                <Link to={"/store/detail/"+keys[index].replace("store_","")}>
                                    <img src={mgposter} className="img-responsive"
                                         style={{"width":"220px","height":"250px","padding":"5px"}}
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

export default StoreDetail;