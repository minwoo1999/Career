package com.example.jobhuntwithjpa.controller;


import com.example.jobhuntwithjpa.Entity.UserBookMark;
import com.example.jobhuntwithjpa.Service.BookMarkService;
import com.example.jobhuntwithjpa.Service.CustomUserDetailsService;
import com.example.jobhuntwithjpa.dto.ResponseMessage;
import com.example.jobhuntwithjpa.dto.UserAndBookmarkResponseDto;
import com.example.jobhuntwithjpa.dto.UserBookMarkRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.example.jobhuntwithjpa.Entity.User;
import com.example.jobhuntwithjpa.Service.UserService;
import com.example.jobhuntwithjpa.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@Api(tags={"로그인 api"})
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final BookMarkService bookMarkService;



    @ApiOperation(value="회원가입",notes="회원가입 api {username},{password},{nickname}")
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.signup(userDto));
    }
    @ApiOperation(value="권한확인(user,admin)")
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
    }

    @ApiOperation(value="권한확인(admin)")
    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username).get());
    }


    @GetMapping("/mypage")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<UserAndBookmarkResponseDto> userMypage(){
        List<UserAndBookmarkResponseDto> mypage = userService.getMypage();
        return mypage;

    }

    @GetMapping("/home")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<UserAndBookmarkResponseDto> userhome(){

        List<UserAndBookmarkResponseDto> home = userService.getHome();

        return home;

    }

    @PostMapping("/bookmark/save")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ResponseMessage> bookMarkSave(@RequestBody UserBookMarkRequestDto userBookMarkRequestDto){


        int result = bookMarkService.bookmarkSave(userBookMarkRequestDto);

        return ResponseEntity.ok().body(ResponseMessage.builder()
                .message("즐겨찾기 성공")
                .data(result)
                .build());
    }
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping("/bookmark/delete/{user_bookmark_id}")
    public ResponseEntity<ResponseMessage> bookMarkDelete(@PathVariable long user_bookmark_id){

        System.out.println(user_bookmark_id);
        bookMarkService.bookMarkDelete(user_bookmark_id);

        return ResponseEntity.ok().body(ResponseMessage.builder()
                .message("즐겨찾기 삭제 성공")
                .data(1)
                .build());
    }


}
