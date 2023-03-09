import "./header.css"
import React, { useState, useEffect } from 'react';
import logo from '../../images/logo2.png';
import { Link, useNavigate } from "react-router-dom";

function Header() {
	const [isLogin, setIsLogin] = useState(false); //로그인 관리
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.getItem("tokenId") === null) {
			// sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
		} else {
			// sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
			// 로그인 상태 변경
			setIsLogin(true);
		}
	}, []);

	useEffect(() => {

	}, [isLogin]);

	const Logout = () => {
		if (window.confirm("정말로 로그아웃 하시겠어요?")) {
			sessionStorage.clear();
			setIsLogin(false);
			window.document.location = '/';
			alert("성공적으로 로그인이 완료되었어요!");
		}
	}


	return (
		<div className="Header">
			<nav className="navbar">
				<div className="navLogo" onClick={clickLogo}>
					<img src={logo} alt="홈페이지 로고" className="logo"/>
					{/* <span className="navLogo">JOB </span>
					<span className="navLogo" id="LogoColor">HUNTER</span> */}
				</div>
				<ul className="navMenu">
					{/* 로그인 후 메뉴 표시 */}
					{isLogin ? <li><Link to="/mypage" className="menu">{"마이페이지"}</Link></li> : <li></li>}
					{isLogin ? (<li onClick={Logout}>로그아웃</li>)
						: (<li><Link className="menu" to="/login">{'로그인'}</Link></li>)}
				</ul>
			</nav>
		</div>
	);
}

const clickLogo = () => {
	document.location.href = '/';
}

export default Header;