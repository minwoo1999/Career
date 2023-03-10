package com.example.jobhuntwithjpa.Service;


import com.example.jobhuntwithjpa.Entity.UserBookMark;
import com.example.jobhuntwithjpa.dto.UserAndBookmarkResponseDto;
import com.example.jobhuntwithjpa.jwt.TokenProvider;
import com.example.jobhuntwithjpa.repository.UserBookMarkRepository;
import com.example.jobhuntwithjpa.repository.UserRepository;
import com.example.jobhuntwithjpa.Entity.Authority;
import com.example.jobhuntwithjpa.Entity.User;
import com.example.jobhuntwithjpa.dto.UserDto;
import com.example.jobhuntwithjpa.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.aspectj.asm.IModelFilter;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final UserBookMarkRepository userBookMarkRepository;
    private final PasswordEncoder passwordEncoder;

    private final TokenProvider tokenProvider;

    private final ModelMapper modelMapper;



    @Transactional
    public User signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public Optional<User> getUserWithAuthorities(String username) {
        return userRepository.findOneWithAuthoritiesByUsername(username);
    }

    @Transactional
    public Optional<User> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername);
    }

    @Transactional
    public User getMyUser(String username) {
        return userRepository.findUserByUsername(username);
    }

    public String refresh_to_accessToken() {

        String username = this.getMyUserWithAuthorities().get().getUsername();

        User user = this.getMyUser(username);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //새로운 토큰발급
        String token = tokenProvider.createToken(authentication);

        return token;
    }

    @Transactional
    public List<UserAndBookmarkResponseDto> getMypage() {
        String username = this.getMyUserWithAuthorities().get().getUsername();

        List<User> userByname = userRepository.findUserListByUsername(username);
        List<UserAndBookmarkResponseDto> collect = userByname.stream()
                .map(o -> new UserAndBookmarkResponseDto(o))
                .collect(Collectors.toList());

        return collect;
    }

    @Transactional
    public List<UserAndBookmarkResponseDto> getHome() {
        String username = this.getMyUserWithAuthorities().get().getUsername();

        List<User> userByname = userRepository.findUserListByUsername(username);
        List<UserAndBookmarkResponseDto> collect = userByname.stream()
                .map(o -> new UserAndBookmarkResponseDto(o))
                .collect(Collectors.toList());

        return collect;
    }


}
