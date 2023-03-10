import React, { useState, useEffect, useRef } from "react";
import "./login.css";
import axios from "axios";
import Swal from "sweetalert2";


function Login() {
    const [email, setInputEmail] = useState("");
    const [pass, setInputPw] = useState("");

    const emailRef = useRef("");
    const passRef = useRef("");

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onKeyPressLogin = (e) => {
        if (e.key == 'Enter') {
            onClickLogin();
        }
    }
    const onClickLogin = (e) => {
        console.log("click login");
        console.log("Email : ", email);
        console.log("PW : ", pass);

        if (emailRef.current.value == '') {
            alert("아이디가 입력되지 않았습니다");
            emailRef.current.focus();
        } else if (passRef.current.value == '') {
            alert("비밀번호가 입력되지 않았습니다");
            passRef.current.focus();
        } else {
            axios
                .post("/login", {
                    email: email,
                    pass: pass,
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data === "") {
                        // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                        console.log("======================", res.data.msg);
                        // alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
                        Swal.fire({
                            icon: 'error',
                            title: '아이디 혹은 비밀번호가 일치하지 않습니다.',
                            // timer: 100000,
                        }).then((q) => {
                            if (q.isConfirmed) {
                                document.location.href = "/login";
                            }
                        }

                        );


                    } else if (res.data !=null ) {
                        // id, pw 모두 일치 userId = userId1, msg = undefined
                        // console.log(res.data);
                        sessionStorage.setItem("tokenId", res.data.split("/")[0]); 

                        sessionStorage.setItem("refreshTokenId", res.data.split("/")[1]); // sessionStorage에 id를 user_id라는 key 값으로 저장

                        console.log("======================", "로그인 성공");
                        Swal.fire({
                            icon: 'success',
                            title: '로그인 성공!',
                            // timer: 100000,
                        }).then((q) => {
                            if (q.isConfirmed) {

                                document.location.href = "/";

                            }
                        }

                        );
                    }
                })
                .catch();
        }
    };

    return (
        <div className="LoginForm">
            <div className="navLogo" onClick={clickLogo}>
                <span className="navLogo">
                    JOB-HUNTER </span>
            </div>
            <div className="InputId">
                <input
                    type="text"
                    path="email"
                    placeholder="이메일"
                    name="email"
                    value={email}
                    onChange={handleInputEmail}
                    onKeyPress={(e) => onKeyPressLogin(e)}
                    ref={emailRef}
                />
            </div>
            <div className="InputPw">
                <input
                    type="password"
                    path="pass"
                    placeholder="비밀번호"
                    name="pass"
                    value={pass}
                    onChange={handleInputPw}
                    onKeyPress={(e) => onKeyPressLogin(e)}
                    ref={passRef}
                />
            </div>
            <div className="LoginBtn" onClick={onClickLogin}>
                로그인
            </div>
            <div className="LoginOption">
                <ul className="option-list">
                    <li className="list-item-text">
                        <a href="/findId" id="findId">
                            아이디 찾기
                        </a>
                    </li>
                    <li className="list-item-text">
                        <a href="/findPw" id="findPw">
                            비밀번호 찾기
                        </a>
                    </li>
                    <li className="list-item-text">
                        <a href="/join" id="signUp">
                            회원가입
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const clickLogo = () => {
    document.location.href = "/";
};

export default Login;