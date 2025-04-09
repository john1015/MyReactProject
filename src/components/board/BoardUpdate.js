import {Fragment,useState,useRef,useEffect} from "react";
import {useParams,useNavigate,Link} from "react-router-dom";
import apiClient from "../../http-commons"
import {useQuery,useMutation} from "react-query";


function BoardUpdate() {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [pwd, setPwd] = useState("");
    const nameRef = useRef(null);
    const subjectRef = useRef(null);
    const contentRef = useRef(null);
    const pwdRef = useRef(null);
    const nav=useNavigate()
    const {id}=useParams()

    // 변수
    const {isLoading,isError,error,data}=useQuery(['board-update',id],
        async ()=>{
            return await apiClient.get(`/board/update_react/${id}`)
        },
        {
            onSuccess:(res)=>{
                // v-model="name"
                // vo=res.data
                setName(res.data.name)
                setSubject(res.data.subject)
                setContent(res.data.content)
            }
        },
        {
            onError:(err)=>{
                console.log(err.response)
            }
        }
    )

    const boardUpdate=()=>{
        if(name.trim()==="")
        {
            nameRef.current.focus()
            return
        }
        else if(subject.trim()==="")
        {
            subjectRef.current.focus()
            return
        }
        else if(content.trim()==="")
        {
            contentRef.current.focus()
            return
        }
        else if(pwd.trim()==="")
        {
            pwdRef.current.focus()
            return
        }

        boardUpdateOk()
    }
    const {mutate:boardUpdateOk}=useMutation(
        async () =>{
            return await apiClient.put(`/board/update_ok_react`,{
                id:id,
                name:name,
                subject:subject,
                content:content,
                pwd:pwd
            })
        },
        {
            onSuccess:(res)=>{
                if(res.data.msg==='yes') // 비밀번호가 맞는 경우
                {
                    // detail로 이동
                    window.location.href="/board/detail/"+id
                }
                else // 비밀번호가 틀린 경우
                {
                    alert("비밀번호가 틀립니다!!")
                    setPwd("")
                    pwdRef.current.focus()
                }
            }
        },
        {
            onError:(err)=>{
                console.log(err)
            }
        }
    )

    return (
        <Fragment>
            <div style={{"backgroundColor": "gray", "height": "150px"}}></div>
            <div style={{"height": "25px"}}></div>
            <div className="breadcumb-area" style={{"background-image": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>수정하기</h2>
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
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>이름</th>
                                    <td width={"85%"}>
                                        <input type={"text"} size={"20"} className={"input-sm"}
                                               ref={nameRef}
                                               onChange={(e) => setName(e.target.value)}
                                               value={name}
                                        />

                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>제목</th>
                                    <td width={"85%"}>
                                        <input type={"text"} size={"60"} className={"input-sm"}
                                               ref={subjectRef}
                                               onChange={(e) => setSubject(e.target.value)}
                                               value={subject}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>내용</th>
                                    <td width={"85%"}>
                                        <textarea rows={"10"} cols={"62"}
                                                  ref={contentRef}
                                                  onChange={(e) => setContent(e.target.value)}
                                                  value={content}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}
                                    >비밀번호
                                    </th>
                                    <td width={"85%"}>
                                        <input type={"password"} size={"10"} className={"input-sm"}
                                               ref={pwdRef}
                                               onChange={(e) => setPwd(e.target.value)}
                                               value={pwd}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={"2"} className={"text-center"}>
                                        <button className={"btn-sm btn-primary"} onClick={boardUpdate}>수정</button>
                                        &nbsp;
                                        <button className={"btn-sm btn-danger"} onClick={() => nav(-1)}>취소</button>
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

export default BoardUpdate