package com.example.jobhuntwithjpa.dto;

import com.example.jobhuntwithjpa.Entity.User;
import com.example.jobhuntwithjpa.Entity.UserBookMark;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserBookMarkRequestDto {

    long user_bookmark_id;
    String bookMarkImg;
    String bookMarkName;
    String bookMark_End_Date;
    String bookMark_Start_Date;
    String company_link;

    long user_id;



    public UserBookMark toEntity(){

        UserBookMark build = UserBookMark.builder()
                .id(user_bookmark_id)
                .bookMarkImg(bookMarkImg)
                .bookMarkName(bookMarkName)
                .bookMark_End_Date(bookMark_End_Date)
                .bookMark_Start_Date(bookMark_Start_Date)
                .company_link(company_link)
                .build();
        return build;


    }



}
