# Mission#3 정리

- 노션에 있는 개념 정리하기
  - https://www.notion.so/3-Mission-Something-behind-b507a0cf07004ac5b569aed4ffafbdc4



---



- 목표
  - Todo list 기능을 하는 REST API 서버를 구현한다.
  - GET, POST, PATCH, DELETE method를 구현한다.
- 테스트 시 사용할 툴
  - 단순히 웹 브라우저에서 구현한 서버에 접속하면 GET 메소드로만 요청이 가능하므로 REST API를 테스트하기 불편하다.
  - Chrome 확장 프로그램인 **Advanced REST Client**를 사용했다.
- node.js + express.jsde.js + express.js를 사용했다.

<br>

---

### method 기본 틀

```java
app.get('/todos/', (req,res)) => {
	//GET method 내용
}

app.post('/todos/', (req, res)) => {
    //POST method 내용
}

app.patch('/todos/:todo_id', (req, res)) => {
    //PATCH method 내용
}

app.delete('/todos/:todo_id', (req, res)) => {
    //DELETE method 내용
}
```

- '/todos/' : request URL이 http://localhost:포트번호/todos/

- '/todos/:todo_id' : request URL이 http://localhost:포트번호/todos/{id}

- req : 요청(request)  객체

  - 요청은 path variable, query parameter, request body를 통해  가능

  - **path variable**

    - 이번 미션 코드에서 http://localhost:5000/todos/{id} 의 {id}가 path variable이다. todos라는 자원 중 {id}번에 대해 요청한다는 의미.

  - **query parameter**

    - ?로 시작하여 넘기는 매개변수
    - http://localhost:5000/todos/1?option=bana&amount=double

  - **request body**

    - path variable, query parameter은 URL에 값이 드러난다. 하지만 비밀번호처럼 값이 드러나면 안되는 경우에는? request body안에 값을 넣어 요청한다.

    - Advanced REST Client 프로그램에서 따로 body를 작성해 넘길 수 있다.

      - ```javascript
        {
        	"content": "제발 종강하기",
          	"completed": true
        }
        //body는 이런 식으로 작성한다.
        ```

<br>

- res : 응답(response) 객체

  - ```javascript
    res.send(response); //response를 전송한다.
    ```

  - ```javascript
    res.json(response); //JSON response를 전송한다.
    ```

<br>

### 기타 함수

- ```javascript
  Object.keys(객체); //객체의 key부분을 배열로 만들어 반환한다.
  ```

  - 예시

    ```javascript
    //req.body 객체
    {
    	"content": "제발 종강하기",
      	"completed": true
    }
    
    var keyArray = Object.keys(req.body);
    //keyArray = Array["content", "completed"]
    ```

  - 만들어진 배열의 요소에 하나하나 접근할 때

    ```javascript
    for(key of keyArray){
    	//이때 key는 처음엔 "content", 두번째엔 "completed"
    }
    
    //주의할 점
    for(var key in keyArray){
    	//이렇게 하면 key가 처음엔 0, 두번째엔 1
    }
    ```

<br>

- splice

  ```javascript
  배열.splice(start[, deleteCount[, item1[, item2[, ...]]]]);
  //배열의 요소를 삭제하거나 추가한다.
  //배열 인덱스 start부터 deleteCount개(start 포함) 만큼 삭제, start 위치에 item1부터 추가
  ```

  - start : 배열의 변경을 시작할 인덱스

    - **음수**를 지정한 경우: 배열의 끝에서부터 요소를 센다.
    - **배열의 길이보다 큰 수**를 지정한 경우: 실제 시작 인덱스는 배열의 길이로 설정
    - **절대값이 배열의 길이보다 큰 경우**: 0으로 세팅

  - deleteCount: 배열에서 제거할 요소의 수.

    - 생략 / 값이 array.length - start보다 큰 경우: start부터의 모든 요소를 제거.
    - 0 이하의 수를 지정: 어떤 요소도 제거되지 않는다.

  - item1, item2, ... : 배열에 추가할 요소

    - 지정하지 않는 경우 : splice()는 요소 제거만 수행한다.

  - 반환값 : 제거한 요소를 담은 배열

    - 아무 값도 제거하지 않았으면 빈 배열을 반환한다.

  - 예시

    ```javascript
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var arr1 = arr.splice(10, 2, 'a', 'b', 'c');
    console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "a", "b", "c"]
    console.log(arr1); // [11, 12]
    
    //출처: https://im-developer.tistory.com/103
    ```

    