package com.example.jobhuntwithjpa.dto;

import com.example.jobhuntwithjpa.Entity.Authority;
import com.example.jobhuntwithjpa.Entity.User;
import com.example.jobhuntwithjpa.Entity.UserBookMark;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ManyToOne;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAndBookmarkResponseDto {

    private long user_id;
    private String nickname;
    private String username;


    private List<bookMarkdto> bookmark;

    public UserAndBookmarkResponseDto(User user) {
        user_id=user.getUserId();
        nickname =user.getNickname() ;
        username=user.getUsername();
        bookmark=user.getBookmark().stream()
                .map(b->new bookMarkdto(b))
                .collect(Collectors.toList());
    }
}
