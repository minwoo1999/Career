import { useState, useEffect } from 'react';
import Footer from './Form/Footer';
import Header from './Form/Header';
import axios from "axios";
// import news from "./json/news.json"
import "./Main.css";
import Swal from "sweetalert2";

function Main() {
    return (
        <div className="Main">
            <Header />
            <MainContainer></MainContainer>
        </div>



    )
}

// console.log(news);
let date = new Date().getMonth() + 1 + "/" + new Date().getDate()
// console.log(date);

const ID = sessionStorage.getItem("tokenId")
const refreshTokenId = sessionStorage.getItem("refreshTokenId")

console.log(ID);
console.log(refreshTokenId);


function MainContainer() {
    const [message, setMessage] = useState('');

    const [ch, setCh] = useState(null);


    // company 정보가 담겨있는 useState예요
    const [company, setCompany] = useState([]);

    // search 구현을 위한 사용자의 쿼리 입력 값을 담아요
    const [user, setUser] = useState("");
    const [userBookmark, setUserBookmark] = useState("");
    const [isResult, setResult] = useState(true);

    function callback(str) {
        setMessage(str);
    }

    const run = () => {
        axios
            .get("/home", {
                headers: {
                    Authorization: `${sessionStorage.getItem("tokenId")}`,
                    refreshTokenId: `${sessionStorage.getItem("refreshTokenId")}`
                }
            })
            .then((res) => {
                // console.log(res.data);
                setUserBookmark(res.data)

                // if (res.data == true) {
                //     // console.log(res.data)

                // } 
                if (res.data[0] == 'false') {
                    sessionStorage.removeItem("tokenId")
                    console.log(res.data);
                    axios.get("/refresh", {
                        headers: {
                            refreshTokenId: `${sessionStorage.getItem("refreshTokenId")}`
                        }
                    }).then((res) => {
                        console.log(res.data);
                        sessionStorage.setItem("tokenId", res.data)
                        
                        if (res.data == false){
                            

                    
                            Swal.fire({
                                title: '로그인 유효시간 종료!',
                                text: '로그인 페이지로 이동하시겠습니까?',
                                icon: 'warning',
        
                                showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                                confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                                cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                                confirmButtonText: '승인', // confirm 버튼 텍스트 지정
                                cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        
                                reverseButtons: true, // 버튼 순서 거꾸로

                                
        
                            }).then(result => {

                                sessionStorage.clear()
                                // 만약 Promise리턴을 받으면,
                                if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        
                                    window.location.href = "/login";
                                }else{
                                    window.location.href = "/";
                                }
                            });
                        }
                    })
                } else if (res.data == "noLogin") { console.log("noLogin"); }
            })
    }

    useEffect(run, [])


    let tokenId = sessionStorage.getItem("tokenId");
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("tokenId") === null) {
            // sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
        } else {
            // sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
            // 로그인 상태 변경
            setIsLogin(true);
        }
    });

    // console.log("로그인 상태 : " + isLogin);

    // 회사 정보를 불러오는 useEffect Hook!
    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/jobhunting-page/jobhunt/main/companyInfo/news.json", {
        })
            .then((res) => {
                setCompany(() => {
                    return res.data;
                })
            });
    }, [])

    const [search, setSearch] = useState('');
    const [data, setData] = useState([{
        Cname: '',
        content: ''
    }]);


    const styleInfo = {
        paddingRight: '7px'
    }

    const jlink = (link, e) => {
        // console.log(link);

        if (link != null) {
            const jobKorea = "https://www.jobkorea.co.kr" + link;
            window.open(jobKorea);
        } else {
            window.location.href = "/";
        }
    }

    const news = Object.entries(company)

    console.log(userBookmark);

    const items = news.map((item, key) => {
        if (search === "") {
            return null
        }
        else if (item[0].toLowerCase().includes(search.toLowerCase()) || item[0].toLowerCase().includes(search.toLowerCase())) {
            // userBookmark.map((userBookmark, key) => {
            //     console.log(userBookmark.companyname);
            // })
            let end = item[1].plan.split('~')[1]

            console.log(date);
            console.log(end);
            let date1 = new Date(end)
            // console.log(date1);

            let date2 = new Date(date)
            // console.log(date2);

            if(date1 >= date2){
                return <ItemBox name={item[0]} state={item[1].state} content={item[1].content} position={item[1].position} plan={item[1].plan} link={item[1].link} img={item[1].img} />
            }
            // return <ItemBox name={item[0]} state={item[1].state} content={item[1].content} position={item[1].position} plan={item[1].plan} link={item[1].link} img={item[1].img} />
            
        }
    })

    const searchCompany = (event) => {
        setUser(event.target.value);
    }

    const bookmark = (e, companyname, plan, img, link) => {
        if (ID == null) {
            Swal.fire({
                title: '즐겨찾기 기능은 로그인 후 가능합니다!',
                text: '로그인 페이지로 이동하겠습니까?',
                icon: 'warning',

                showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                confirmButtonText: '승인', // confirm 버튼 텍스트 지정
                cancelButtonText: '취소', // cancel 버튼 텍스트 지정

                reverseButtons: true, // 버튼 순서 거꾸로

            }).then(result => {
                // 만약 Promise리턴을 받으면,
                if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

                    window.location.href = "/login";
                }
            });
        }
        if (ID != null) {
            var start, end

            start = plan.split('~')[0]
            end = plan.split('~')[1]

            console.log(ID, companyname, start, end, img, link);

            axios
                .post("/company-save",
                    {
                        companyname: companyname,
                        companyimg: img,
                        company_start: start,
                        company_end: end,
                        company_link: link

                    }, { headers: { Authorization: `${sessionStorage.getItem("tokenId")}` } }
                ).then(result => {
                    if (result.data == 1) {
                        Swal.fire({
                            icon: 'success',
                            title: '즐겨찾기 Success',
                            // timer: 100000,
                        })
                    } else if (result.data == 2) {
                        Swal.fire({
                            icon: 'error',
                            title: '이미 즐겨찾기가 되어있습니다.',
                            // timer: 100000,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '로그인 후 이용해주세요',
                            // timer: 100000,
                        })
                    }


                });
        }

    }

    return (
        <div className="banner_box">

            <img className="bannerImg" alt="banner_01" src="img/job_banner.PNG" />

            <br></br>
            <span className="banner_text">원하는 회사의 정보를 얻어가세요!</span>
            <span className="banner_text2">Find You Want Company</span>
            <br></br>

            <div className="serach_input">
                <input type="text" placeholder="회사를 입력하세요" onChange={event => { setSearch(event.target.value) }} />
                <button className="search_submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <br />
            <div className="SearchResultForm">
                {items}
            </div>


        </div>
    )


    function ItemBox(props) {

        var mark = "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
         userBookmark.map((userBookmark, key) => {
                if(userBookmark.companyname == props.name){
                    mark = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                }
            })

        
        return (
            <div class="container">
                <div class="card u-clearfix">
                    <div class="card-media" onClick={(e) => { jlink(props.link) }}>
                        <img src={props.img} alt="" class="card-media-img" />
                    </div>

                    <div class="card-body">
                        <h2 class="card-body-heading">{props.name}</h2>
                        <div class="card-body-options">
                            <div class="card-body-option card-body-option-favorite">
                                <svg fill="#d12e46" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { bookmark(e, props.name, props.plan, props.img, props.link, props.bookmark) }}>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d= {mark}/>
                                </svg>
                            </div>
                            <div class="card-body-option card-body-option-share">
                                <svg fill="#9C948A" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                            </div>
                        </div>
                        <br />
                        <div class="card-button card-button-link">
                            <span>{props.state}</span>
                            <br />
                            <span>{props.content}</span>
                            <br />
                            <span>{props.position}</span>
                            <br />
                            <span>{props.plan}</span>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Main;