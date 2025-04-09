import {useState, useEffect, Fragment, useRef} from "react";
import {useQuery,useMutation} from "react-query";
import {useParams, Navigate, useNavigate} from "react-router-dom";
import apiClient from "../../http-commons";

function BoardDelete(){
    const{id}=useParams();
    const pwdRef=useRef(null);
    const [pwd,setPwd] = useState(null);
    const nav =useNavigate();
    const {isLoading,mutate:boardDelete}=useMutation(
        async ()=>{
            return await apiClient.delete(`/board/delete_react/${id}/${pwd}`)
        },
        {
            onSuccess:(res)=>{
                if(res.data.msg==='yes'){
                    window.location.href="/board/list";
                } else {
                    alert("비밀번호가 틀립니다!!!")
                    setPwd("")
                    pwdRef.current.focus()
                }
            }
        },
        {
            onError:(res)=>{
                console.log(res.response)
            }
        }
    )
    const boardDeleteOk=()=>{
        if(pwd.trim()===""){
            pwdRef.current.focus()
            return
        }
        boardDelete()
    }


    return(
        <Fragment>
            <div style={{"backgroundColor": "gray", "height": "150px"}}></div>
            <div style={{"height": "25px"}}></div>
            <div className="breadcumb-area" style={{"background-image": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>삭제하기</h2>
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
                            <tbody>
                            <tr>
                                <td className={"text-center"}>
                                    비밀번호:<input type={"password"} className={"input-sm"} size={"15"}
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={pwd}
                                                ref={pwdRef}
                                />
                                    <button className={"btn-sm btn-primary"} onClick={boardDeleteOk}>삭제</button>
                                    <button className={"btn-sm btn-danger"} onClick={() => nav(-1)}>취소</button>
                                </td>
                            </tr>
                            </tbody>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default BoardDelete;