import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./MyPage.css";
import Header from './Form/Header';
import axios from "axios";

function MyPage() {
  return (
    <div className="MyPageContent">
      <Header />
      <MyPageContent />

      
    </div>
  )
}
function MyPageContent() {
  const ID = sessionStorage.getItem("tokenId")
  const [inputData, setInputData] = useState([{
    uno:'',
    email: '',
    nickname:'',
    phone:'',
    companyname: '',
    companyimg: '',
    company_start: '',
    company_end: '',
    company_link: '',
    // 채용정보
  }])
  const run = () => {
    axios
        .get("/mypage", {
            headers: {
                Authorization: `${sessionStorage.getItem("tokenId")}`,
                refreshTokenId: `${sessionStorage.getItem("refreshTokenId")}`
            }
        })
        .then((res) => {
            console.log(res.data);
            console.log(sessionStorage.getItem("tokenId"));
            console.log(sessionStorage.getItem("refreshTokenId"));
            setInputData(res.data)

            // if (res.data == true) {
            //     // console.log(res.data)

            // } 
            if (res.data[0] == "false") {
                sessionStorage.removeItem("tokenId")
                console.log(res.data);
                axios.get("/refresh", {
                    headers: {
                        refreshTokenId: `${sessionStorage.getItem("refreshTokenId")}`
                    }
                }).then((res) => {
                    console.log(res.data);
                    sessionStorage.setItem("tokenId", res.data)
                    
                    if (res.data[0] == "false"){
                        

                
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
                    }else if (res.data == sessionStorage.getItem("tokenId")) { 
                      window.location.href = "/mypage";
                    }
                })
            } 
            
        })
}

useEffect(run, [])
  console.log(inputData);

  const jlink = (link, e) => {
    // console.log(link);

    if (link != null) {
        const jobKorea = "https://www.jobkorea.co.kr" + link;
        window.open(jobKorea);
    } else {
        window.location.href = "/";
    }
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

              },{headers: {Authorization: `${sessionStorage.getItem("tokenId")}`}}
              ).then(result => {
                
                console.log(result);
            });
  }

}

const delete_bookmark= (e, companyname) => {
  if (ID != null) {
      Swal.fire({
          title: '즐겨찾기 삭제를 하시겠습니까?',

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

            axios
            .post("/company-delete",
                {
                    companyname: companyname
  
                },{headers: {Authorization: `${sessionStorage.getItem("tokenId")}`}}
                ).then(result=>{

                    if(result.data==1){
                      window.location.reload();
                    }
                    else{
                      console.log("삭제실패");
                    }
                })
          }
      });
  }

}

  return (
      <div class="metee_mypage_main_wraper_join_style">
          <span class="myPageInfutTitle">이메일</span>
					<input class="myPageInputBox"  id='reg_mb_id' name="id" value={inputData[0].email} readonly /> 


          <span class="myPageInfutTitle">비밀번호</span>
					<input class="myPageInputBox" type="password"
						name="pass" maxlength="20" required
						placeholder="password-1"/>
				

          <span class="myPageInfutTitle">이름</span>
					<input class="myPageInputBox"  id='reg_mb_id' name="id" value={inputData[0].nickname} readonly /> 

          <span class="myPageInfutTitle">전화번호</span>
					<input class="myPageInputBox"  id='reg_mb_id' name="id" value={inputData[0].phone} readonly /> 

          <span class="myPageInfutTitle">내가 찜한 채용공고</span>
					<div className="Card1">
            <div className="c1image">
            {inputData.map((v, index) => {
            if (index > 0){
              var plan
              plan = v.company_start + "~" + v.company_end
              return <ItemBox name={v.companyname} plan={plan} link={v.company_link} img={v.companyimg} />
              // return v.companyname
            }
          })}
            </div>
        </div>
          
          <div align="center" class="profile_correction">
			  </div>
    </div>
  )


  function ItemBox(props) {
    return (
        <div class="container">
            <div class="card u-clearfix">
                <div class="card-media" onClick={(e) => { jlink(props.link) }}>
                    <img src={props.img} alt="" class="card-media-img" />
                </div>
                <img src="img/delete.png" class="delete-img" width="10px" onClick={(e) => { delete_bookmark(e,props.name) }}></img>

                <div class="card-body">
                    <h2 class="card-body-heading">{props.name}</h2>
                    <div class="card-body-options">
                        <div class="card-body-option card-body-option-favorite">
                            <svg fill="#d12e46" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { bookmark(e, props.name, props.plan, props.img, props.link) }}>
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
                        <span>{props.plan}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
}



export default MyPage;