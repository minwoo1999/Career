import "./header.css"

import React, { useState, useEffect } from 'react';

function Header() {
	const [isLogin, setIsLogin] = useState(false); //로그인 관리
	useEffect(() => {
		if (sessionStorage.getItem("tokenId") === null) {
			// sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
		} else {
			// sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
			// 로그인 상태 변경
			setIsLogin(true);
		}
	});


	return (
		<div className="Header">
			<nav className="navbar">
				<div className="navLogo" onClick={clickLogo}>
					<span className="navLogo">JOB </span>
					<span className="navLogo" id="LogoColor">HUNTER</span>
				</div>
				<ul className="navMenu">
					{/* 로그인 후 메뉴 표시 */}
					{isLogin ? <li><a className="menu" href="/mypage">{"마이페이지"}</a></li> : <li></li>}
					{isLogin ? (<li><a className="menu" onClick={() => { sessionStorage.clear() }} href="/">{'로그아웃'}</a></li>)
						: (<li><a className="menu" href="/login">{'로그인'}</a></li>)}
				</ul>
			</nav>
		</div>
	);
}

const clickLogo = () => {
	document.location.href = '/';
}

export default Header;