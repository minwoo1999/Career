import "./join.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Join() {
  const [email, setInputEmail] = useState("");
  const [pass, setInputPw] = useState("");
  const [pass2, setInputPw2] = useState("");
  const [nickname, setInputnickname] = useState("");
  const [sex, setInputSex] = useState("");
  const [birth, setInputBirth] = useState("");
  const [phone, setInputPhone] = useState("");
  const [idMes, setIdMes] = useState("");
  const [passMes, setPassMes] = useState("");
  const [nickNameMes, setNickNameMes] = useState("");
  let [id_, setId] = useState();
  let [pass_, setPass] = useState();
  let [nickname_, setNickName] = useState();

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleInputPw2 = (e) => {
    setInputPw2(e.target.value);
  };

  const handleInputnickname = (e) => {
    setInputnickname(e.target.value);
  };

  const handleInputSex = (e) => {
    setInputSex(e.target.value);
  };

  const handleInputBirth = (e) => {
    setInputBirth(e.target.value);
  };

  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
  };

  const idCheck = () => {
    axios
      .post("/idCheck", { email: email })
      .then((idRes) => {
        console.log(idRes);
        console.log("idRes.data :: ", idRes.data);

        if (idRes.data == 1) {
          setIdMes("가능");
          setId(1);
        } else if (idRes.data == 0) {
          setIdMes("불가능");
          // alert("아이디중복됨")
          document.getElementById("email").focus();
          setId(0);
        }
      })
      .catch();
      
  };

  const pwCheck = () => {
    axios
      .post("/passCheck", { pass: pass, pass2: pass2 })
      .then((passRes) => {
        console.log(passRes);
        console.log("passRes.data :: ", passRes.data);

        if (passRes.data == 1) {
          setPassMes("일치");
          setPass(1);
        } else if (passRes.data == 0) {
          setPassMes("불일치");
          setPass(0);
        }
      })
      .catch();
  };

  const nickCheck = () => {
    axios
      .post("/nickname", { nickname: nickname })
      .then((nickRes) => {
        console.log(nickRes);
        console.log("nickRes.data :: ", nickRes.data);

        if (nickRes.data == 1) {
          setNickNameMes("가능");
          setNickName(1);
        } else if (nickRes.data == 0) {
          setNickNameMes("중복");
          setNickName(0);
        }
      })
      .catch();
  };

  const onClickJoin = () => {
    // alert(email, pass, pass2, nickname, sex, birth, phone)
    if (
      email != "" &&
      pass != "" &&
      pass2 != "" &&
      nickname != "" &&
      sex != "" &&
      birth != "" &&
      phone != ""
    ) {
      if (id_ == 1 && pass_ == 1 && nickname_ == 1) {
        console.log("click Join");
        console.log("email : ", email);
        console.log("PW : ", pass);
        console.log("PW2 : ", pass2);
        console.log("nickname : ", nickname);
        console.log("sex : ", sex);
        console.log("birth : ", birth);
        console.log("phone : ", phone);
        axios
          .post("http://localhost:8080/join", {
            email: email,
            pass: pass,
            pass2: pass2,
            nickname: nickname,
            sex: sex,
            birth: birth,
            phone: phone,
          })
          .then((joinRes) => {
            if (joinRes.data == 1) {
              Swal.fire({
                icon: 'success',
                title: '회원가입 성공!',
                // timer: 100000,
            }).then((q) => {
              if(q.isConfirmed){
                document.location.href = "/";
              }
            }
            );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (id_ == 0) {
        alert("아이디가 중복됩니다");
      } else if (pass_ == 0) {
        alert("암호가 일치하지 않습니다");
      } else if (nickname_ == 0) {
        alert("닉네임이 중복됩니다");
      }
    } else {
      alert("입력하지 않은 항목이 있습니다");
    }

    console.log("=====", id_, pass_, nickname_);
    console.log(email);
    console.log(pass);
    console.log(pass2);
    console.log(nickname);
    console.log(sex);
    console.log(birth);
    console.log(phone);
  };
  
  return (
	<div className="JoinForm">
      <div className="navLogo" onClick={(e) => {clickBtn("/", e)}}>
        <span className="navLogo">JOB-HUNTER </span>
      </div>
	  <div className="InputId">
	  	<input type="text" path="email" placeholder="이메일" id="email" name="email" value={email} onChange={handleInputEmail} onKeyUp={idCheck}/>
      <div style={ id_ == 0 ? {display:"block"} : {display:"none"}}>아이디가 중복됩니다</div>
	  </div>
	  <div className="InputPw">
	  	<input type="password" path="pass" placeholder="비밀번호" id="pass" name="pass" value={pass} onChange={handleInputPw} />
	  </div>
	  <div className="InputPwCheck">
	  	<input type="password" path="pass2" placeholder="비밀번호 확인" id="pass2" name="pass2" value={pass2} onChange={handleInputPw2} onKeyUp={pwCheck} />
      <div style={ pass_ == 0 ? {display:"block"} : {display:"none"}}>비밀번호가 일치하지 않습니다</div>
	  </div>
	  {/* <div className="InputName">
	  	<input type="text" path="name" placeholder="이름" id="name" name="name" value={name} onChange={handleInputName} />
	  </div> */}
	  <div className="InputNickName">
	  	<input type="text" path="nickname" placeholder="닉네임" id="nickname" name="nickname" value={nickname} onChange={handleInputnickname} onKeyUp={nickCheck} />
      <div style={ nickname_ == 0 ? {display:"block"} : {display:"none"}}>닉네임이 중복됩니다</div>
	  </div>
	  <div className="InputBirth">
		<div className="Birth">
			<span>생년월일</span>
		</div>
		<div className="InputBirthForm">
			<input type="text" maxLength="8" onChange={handleInputBirth} id="birth" name="birth" value={birth} placeholder="생년월일 (8자)" />
			{/* <select name="month">
				<option value="월">월</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
			</select> */}
			{/* <input type="text" maxLength="2" placeholder="일" /> */}
		</div>
	  </div>
	  <div className="InputSex">
		<select name="sex" onChange={handleInputSex}>
			<option value="">성별</option>
			<option value="M">남</option>
			<option value="W">여</option>
			<option value="N">선택 안함</option>
		</select>
	  </div>
	  <div className="InputPhone">
	  	<input type="text" path="phone" name="phone" value={phone} placeholder="전화번호" onChange={handleInputPhone} />
	  </div>
	  <div className="JoinNextBtn" onClick={onClickJoin}>가입하기</div>
	</div>
  )
}

const clickBtn = (params, e) => {
    console.log(params);
    if(params == "/") {
        document.location.href = "/";
    } else if(params == "Join") {
        document.location.href = "/join";
    }
};

export default Join;
