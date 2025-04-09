import { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from "../../http-commons";

function Header() {
    const [login, setLogin] = useState(false);
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const idRef = useRef(null);
    const pwdRef = useRef(null);

    // 컴포넌트 마운트 시 세션 스토리지 확인
    useEffect(() => {
        const storedId = window.sessionStorage.getItem("id");
        if (storedId) {
            setLogin(true); // 세션 스토리지에 값이 있으면 로그인 상태로 설정
        }
    }, []);

    const { isLoading, isError, error, data, refetch: loginOk } = useQuery(
        ['login-ok'],
        async () => {
            return await apiClient.get(`/member/login/${id}/${pwd}`);
        },
        {
            onSuccess: (res) => {
                if (res.data.msg === 'NOID') {
                    alert("아이디가 존재하지 않습니다");
                    setId('');
                    setPwd('');
                    idRef.current.focus();
                } else if (res.data.msg === 'NOPWD') {
                    alert("비밀번호가 틀립니다");
                    setPwd('');
                    pwdRef.current.focus();
                } else if (res.data.msg === 'OK') {
                    window.sessionStorage.setItem('id', res.data.id);
                    window.sessionStorage.setItem('name', res.data.name);
                    window.sessionStorage.setItem('sex', res.data.sex);
                    setLogin(true);
                }
            }
        },
        {
            onError: (err) => {
                console.log(err.response);
            }
        }
    );

    const memberLogin = () => {
        if (id.trim() === "") {
            idRef.current.focus();
            return;
        } else if (pwd.trim() === "") {
            pwdRef.current.focus();
            return;
        }
        loginOk();
    };

    const memberLogout = () => {
        window.sessionStorage.clear();
        setId('');
        setPwd('');
        setLogin(false);
    };

    return (
        <Fragment>
            <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <a href="index.html" className="logo"></a>
                                <ul className="nav">
                                    <li><a href="/">Home</a></li>
                                    <li className="dropdown">
                                        <a href="#" className="dropbtn">영화</a>
                                        <div className="dropdown-content">
                                            <a href="/movie/list" style={{ "marginBottom": "10px" }}>영화 목록</a>
                                            <a href="/movie/find" style={{ "marginBottom": "10px" }}>영화 검색</a>
                                        </div>
                                    </li>
                                    <li><a href="/store/list">상점</a></li>
                                    <li className="dropdown">
                                        <a href="#" className="dropbtn">커뮤니티</a>
                                        <div className="dropdown-content">
                                            <a href="/board/list" style={{ "marginBottom": "10px" }}>게시판</a>
                                            <a href="/news/list" style={{ "marginBottom": "10px" }}>뉴스 검색</a>
                                        </div>
                                    </li>
                                    <li>
                                        {
                                            !login &&
                                            <div className="login">
                                                ID:<input type={"text"} size={"10"} className={"input-sm"}
                                                          value={id}
                                                          ref={idRef}
                                                          onChange={(e) => setId(e.target.value)}
                                            /> &nbsp;
                                                pwd:<input type={"password"} size={"10"} className={"input-sm"}
                                                           value={pwd}
                                                           ref={pwdRef}
                                                           onChange={(e) => setPwd(e.target.value)}
                                            /> &nbsp;
                                                <button className={"btn-sm btn-outline-danger"} onClick={memberLogin}>로그인</button>
                                            </div>
                                        }
                                        {
                                            login &&
                                            <div className={"login"}>
                                                {window.sessionStorage.getItem("name")}님 로그인 중입니다 &nbsp;
                                                <button className={"btn-sm btn-outline-danger"}
                                                        onClick={memberLogout}>로그아웃</button>
                                            </div>
                                        }
                                    </li>
                                </ul>
                                <a className='menu-trigger'>
                                    <span>Menu</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );
}

export default Header;
