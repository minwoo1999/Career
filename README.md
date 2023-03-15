![image](https://user-images.githubusercontent.com/79193811/224291245-5a19eb86-4d94-4db3-ab8d-fdcfb048b262.png)


## 프로젝트 기간

---

- 2022-12 ~ 2023-1.

## 팀원

---

- 백엔드 2명(김민우,이창훈)
- 프론트 1명(김현우)

## 💡 Background

---

- 점점 취업할 시기가 다가오는 나이가 되고, 취업사이트에 자주 방문하게 됨. 하지만 **잡코리아,사람인 등등 여러 채용사이트들은 다른기능이 너무 많아 시야가 분산되는 문제**가 발생
- **잡코리아의 스크랩 3월만 보관 후 자동삭제를 함**으로 이전에 스크랩했었던 공채소식은 찾기가 힘듬.

## 📝 Features

---

> 각 항목의 Features Preview 토글을 클릭하면 기능 스크린샷을 볼 수 있습니다.
> 

### 1.  회사 공채 검색기능

```
✔️ 회사 공채를 검색할 시 현재 날짜를 기준으로 해당하는 공채를 즉시 확인 가능
```

- 💻 **Features Preview**
    
  ![jobhunt](https://user-images.githubusercontent.com/79193811/224291793-5af80c00-f67e-4bc0-83f9-06bc70e00905.PNG)

    

### 2.  회사 공채 스크랩(즐겨찾기)기능

```
✔️ 회사 공채를 스크랩(즐겨찾기)하여 날짜 제약없이 회사정보 확인 가능
```

- 💻 **Features Preview**
    
   ![jobhunt_search](https://user-images.githubusercontent.com/79193811/224291805-98d758f4-8cc2-4660-9dc2-109827ba8803.PNG)

### 3.  공채사이트 이동

```
✔️ 회사 클릭시 JOBKOREA의 회사공채소식을 더욱 상세하게 확인가능 
```

- 💻 **Features Preview**
    
   ![jobkorea 회사공채소식](https://user-images.githubusercontent.com/79193811/224291819-aa8b3ecc-b927-4e94-915d-034435acfd61.PNG)
    

### 사용한 기술 및 라이브러리

---

- BackEndTool: Spring framework,JPA
- FrontTool: React
- Container : Docker
- Infra : AWS EC2
- crawling : Selenium , Google Driver
- Auth: JWT
- DevOps:Jenkins , GitAction
- API Document: Swagger API

### DATABASE S**chema**

---

![image](https://user-images.githubusercontent.com/79193811/224291472-50e9bf33-b34c-4cb1-a314-7532cdfbe4f0.png)

## 💻 내가 맡은 역할

---

- 셀레니움과 크롬드라이버를 이용하여 JOBKOREA 월별달력 회사별 이미지를 동적크롤링을 진행하였습니다
- AWS EC2 가상 인스턴스를 생성하고 Docker를 이용하여 컨테이너를 생성 및 배포 하였습니다.
- Jenkins를 사용하여 CI/CD 파이프라인을 구축하였습니다.
- JWT로그인을 구현하였습니다.

### 🛠️ AWS Architecture

![image](https://user-images.githubusercontent.com/79193811/224347111-58d01daf-edad-4d6d-8eaf-9cfdb3aea7ed.png)


### 🛠️ CICD는 다음과 같은 형태로 이루어집니다.

---

![https://user-images.githubusercontent.com/79193811/210366331-35c248d1-6a85-41c6-aea6-6284ed1d8c03.png](https://user-images.githubusercontent.com/79193811/210366331-35c248d1-6a85-41c6-aea6-6284ed1d8c03.png)

### 🛠️ Swagger Api 명세서는 다음과 같습니다.

---

![image](https://user-images.githubusercontent.com/79193811/224291341-95732d30-8451-4223-b2cf-b13d3afda83e.png)


### 깨달은점

---

- RestFul Api는 **POST,GET,PUT,DELETE HTTP METHOD** 를 사용한다는 것을 알게 되었습니다.
- session은 서버가 데이터를 가지고있고 JWT는 사용자가 데이터를 가지고있기때문에 서버에 부담이 덜하다는 것을 알수 있었습니다. (확장성은 jwt가 조금더 유리)
- JWT 로그인은 **Header,payload,Signature 로 구성이 되고 hedaer**에 담아서 사용한다는것을 알게되었습니다.
- 동적크롤링을 통해 셀레니움 구글드라이브를 사용해보았으며, div.class(css주소를)을 통해 크롤링을 하는방법을 깨달았습니다.
- git action을 통해 trigger을 설정, cron을 통해 주기적으로 json파일이 만들어지게 함으로써 주기적인 업데이트를 가능하게 할 수있다는것을 깨달았습니다.
- rest api 와 restful api의 차이점을 알게 되었습니다.
- Swagger API를 사용함으로써 API문서작성 방법을 터득하였습니다.
- JWT에서 보안을 위해 **Refresh토큰값의 만료시간은 길고, access Token값의 만료시간은 짧게 설정하여 주기적으로 access token**값을 변경해야 한다는 것을 깨달았습니다.

### **발생한이슈**

---

백엔드에서 React.js 라우터에 있는 주소로 주소를 임의 변경하면, 매핑되는 주소가 없으므로 404 오류가 생긴다. 이를 방지하기 위해 에러가 발생하면 프론트엔드에서 작성한 frontend/src/index.html을 전송한다는 것을 알게되었습니다.

### **이슈해결방안**

---

백엔드에서는 생성된 index.html 연결이 되야한다.(에러처리시 index로 이동시키는 코드)

```
package com.devtest.devtest.controller;import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;@Controller
public class WebController implements ErrorController {
// 백엔드에서 React.js 라우터에 있는 주소로 주소를 임의 변경하면,
// 매핑되는 주소가 없으므로 404 오류가 생긴다.
// 이를 방지하기 위해 에러가 발생하면 프론트엔드에서 작성한 frontend/src/index.html을 전송한다.
@GetMapping({ "/", "/error" })
public String index() {
return "index";
}/*400에러 발생 시 getErrorPath() 호출*/
public String getErrorPath() {
    return "/error";
}

}
```

- https://github.com/minwoo1999/SpringBootReactApp


### CICD 링크

---

[https://github.com/minwoo1999/CI-CD-pipeline](https://github.com/minwoo1999/CI-CD-pipeline)

### 간단한 시연영상

[https://youtu.be/CmeHCtahMfU](https://youtu.be/CmeHCtahMfU)
