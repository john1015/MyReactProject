
function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="about">

                            <h4>사이트</h4>
                            <div className="row">
                                <p>React를 이용한 사이트 / 영화 , 상점 , 뉴스 , 게시판 구현</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="helpful-links">
                            <h4>제작자</h4>
                            <div className="row">
                                <div className="col-lg-6 col-sm-6">
                                    <ul>
                                        <li><a href="#">정유엽</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="contact-us">
                            <h4>Git</h4>
                            <p><a href={"https://github.com/john1015"}>https://github.com/john1015</a></p>
                            <div className="row">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>

    )
}
export default Footer;
