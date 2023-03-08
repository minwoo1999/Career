package com.example.jobhuntwithjpa.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="UserBookMark")
@Setter
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Builder
public class UserBookMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_bookmark_id")
    long id;

    @JsonIgnore
    String bookMarkName;
    @JsonIgnore
    String bookMarkImg;
    @JsonIgnore
    String bookMark_Start_Date;
    @JsonIgnore
    String bookMark_End_Date;
    @JsonIgnore
    String company_link;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) // 다(Many가있는곳이 외래키고) 이것이 연관관계의 주인이된다.
    @JoinColumn(name="user_id")
    private User user;


    /**
     *
     * 만약 bookmark에서 user을 지우지 않은 상태에서 user2로 변경한다면 user1은 여전히 bookmark를
     * 가지고 있지만 bookmakrt는 user2와 서로 관계를 가지고 있다. 그렇기에 setUser 메서드를 아래와 같이 작성해 주는 것이 좋다.
     * @param user
     */

    public void setUser(User user){
        //기존 팀과 관계를 제거
        if (this.user !=null) {
            this.user.getBookmark().remove(this);
        }
        this.user=user;
        user.getBookmark().add(this);
    }


    @Builder
    public UserBookMark(long id, String bookMarkName, String bookMarkImg, String bookMark_Start_Date, String bookMark_End_Date, String company_link, User user) {
        this.id = id;
        this.bookMarkName = bookMarkName;
        this.bookMarkImg = bookMarkImg;
        this.bookMark_Start_Date = bookMark_Start_Date;
        this.bookMark_End_Date = bookMark_End_Date;
        this.company_link = company_link;
        setUser(user);
    }
}
