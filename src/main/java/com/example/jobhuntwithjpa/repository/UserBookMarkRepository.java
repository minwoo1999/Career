package com.example.jobhuntwithjpa.repository;

import com.example.jobhuntwithjpa.Entity.UserBookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface UserBookMarkRepository extends JpaRepository<UserBookMark,Long> {



    UserBookMark findUserBookMarkByIdAndUserUserId(@Param("user_bookmark_id") long user_bookmark_id,@Param("user_id") long user_id);

    @Query("select ub from UserBookMark ub join fetch ub.user u where u.userId = :user_id") // (1)
    UserBookMark findUserBookMarkByUserUserId(long user_id);

    @Query("select b from UserBookMark b join fetch b.user u where u.userId= :user_id")
    List<UserBookMark> findAllWithUser(long user_id);

    UserBookMark findUserBookMarkByUserUserIdAndBookMarkName(@Param("user_id") long user_id,@Param("bookMarkName") String bookMarkName);
}
