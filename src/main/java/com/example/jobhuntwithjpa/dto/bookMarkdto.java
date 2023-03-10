package com.example.jobhuntwithjpa.dto;

import com.example.jobhuntwithjpa.Entity.UserBookMark;
import lombok.Data;

@Data
public class bookMarkdto {

    private long user_bookmark_id;
    private String bookMarkName;
    private String company_link;
    private String bookMarkImg;

    String bookMark_End_Date;

    String bookMark_Start_Date;
    public bookMarkdto(UserBookMark b) {
        user_bookmark_id=b.getId();
        bookMarkName=b.getBookMarkName();
        company_link=b.getCompany_link();
        bookMarkImg=b.getBookMarkImg();
        bookMark_End_Date=b.getBookMark_End_Date();
        bookMark_Start_Date=b.getBookMark_Start_Date();
    }
}
