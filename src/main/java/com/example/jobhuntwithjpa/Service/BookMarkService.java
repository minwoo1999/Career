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
    public int bookmarkSave(UserBookMarkRequestDto userBookMarkRequestDto) {
        User user = userService.getMyUserWithAuthorities().get();
        userBookMarkRequestDto.setUser_id(user.getUserId());
        User userEntity = userRepository.findById(userBookMarkRequestDto.getUser_id()).get();


        UserBookMark userBookMarkByUserUserIdAndbookMarkName = userBookMarkRepository.findUserBookMarkByUserUserIdAndBookMarkName(userBookMarkRequestDto.getUser_id(),userBookMarkRequestDto.getBookMarkName());


        if (userBookMarkByUserUserIdAndbookMarkName!=null){
            return 2; // 이미있는 즐겨찾기
        }else{
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
            return 1;
        }



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
