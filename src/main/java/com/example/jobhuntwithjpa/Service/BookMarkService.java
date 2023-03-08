package com.example.jobhuntwithjpa.Service;

import com.example.jobhuntwithjpa.Entity.User;
import com.example.jobhuntwithjpa.Entity.UserBookMark;
import com.example.jobhuntwithjpa.dto.UserBookMarkRequestDto;
import com.example.jobhuntwithjpa.dto.UserDto;
import com.example.jobhuntwithjpa.repository.UserBookMarkRepository;
import com.example.jobhuntwithjpa.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookMarkService {


    private final UserBookMarkRepository userBookMarkRepository;

    private final UserService userService;
    private final UserRepository userRepository;

    @Transactional
    public void bookmarkSave(UserBookMarkRequestDto userBookMarkRequestDto) {

        User userEntity = userRepository.findById(userBookMarkRequestDto.getUser_id()).get();
        /**
         * 넘어온 userId 값으로 양방향 연관관계 둘다 저장해주기
         */
        UserBookMark userBookMark=UserBookMark.builder()
                .bookMarkImg(userBookMarkRequestDto.getBookMarkImg())
                .bookMark_Start_Date(userBookMarkRequestDto.getBookMark_Start_Date())
                .bookMark_End_Date(userBookMarkRequestDto.getBookMark_End_Date())
                .bookMarkName(userBookMarkRequestDto.getBookMarkName())
                .company_link(userBookMarkRequestDto.getCompany_link())
                .id(userBookMarkRequestDto.getUser_bookmark_id())
                .user(userEntity)
                        .build();
        /**
         * userEntity도 설정해주기
         */
        userBookMark.setUser(userEntity);

        userBookMarkRepository.save(userBookMark);
    }
    @Transactional
    public void bookMarkDelete(long bookmarkId){
        System.out.println("==============="+bookmarkId);
        String username= userService.getMyUserWithAuthorities().get().getUsername();

        User findUser = userRepository.findUserByUsername(username);

        UserBookMark userBookMark=userBookMarkRepository.findUserBookMarkByIdAndUserUserId(bookmarkId,findUser.getUserId());

        userBookMarkRepository.delete(userBookMark);

    }
}
