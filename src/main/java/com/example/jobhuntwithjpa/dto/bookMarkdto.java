package com.example.jobhuntwithjpa.dto;

import com.example.jobhuntwithjpa.Entity.UserBookMark;
import lombok.Data;

@Data
public class bookMarkdto {

    private String bookMarkName;
    private String company_link;
    private String bookMarkImg;
    public bookMarkdto(UserBookMark b) {
        bookMarkName=b.getBookMarkName();
        company_link=b.getCompany_link();
        bookMarkImg=b.getBookMarkImg();
    }
}
