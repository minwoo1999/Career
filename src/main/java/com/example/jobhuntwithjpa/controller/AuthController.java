package com.example.jobhuntwithjpa.controller;


import com.example.jobhuntwithjpa.Entity.User;
import com.example.jobhuntwithjpa.Service.UserService;
import com.example.jobhuntwithjpa.dto.LoginDto;
import com.example.jobhuntwithjpa.dto.TokenDto;
import com.example.jobhuntwithjpa.jwt.JwtFilter;
import com.example.jobhuntwithjpa.jwt.TokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Api(tags={"로그인 api"})
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;



    @ApiOperation(value="로그인",notes="로그인 api {username},{password}")
    //로그인 api 경로
    @PostMapping("/login")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {

        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        //authenticationtoken을 이용해서 authentication 객체를 생성하려고할때 loadUserByname 메소드가 실행된다.


        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        // authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        //여기서 비밀번호 암호화됨
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        String jwt = tokenProvider.createToken(authentication);
        String refresh_jwt = tokenProvider.createrefreshToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new TokenDto(jwt,refresh_jwt), httpHeaders, HttpStatus.OK);
    }
    @PostMapping("/refresh")
    public ResponseEntity<TokenDto> authorize(HttpServletRequest req) throws ExpiredJwtException {

        try{
            String refresh_token = req.getHeader("Authorization");
            //refresh token으로 새로운 토큰을 새로생성
            String token=userService.refresh_to_accessToken();
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + token);
            return new ResponseEntity<>(new TokenDto(token,refresh_token),HttpStatus.OK);

        }catch (JwtException e){
            System.out.println("refresh토큰 만료됨");
            e.printStackTrace();
        }

        //토큰만료시 나가는 return 값
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }



}
