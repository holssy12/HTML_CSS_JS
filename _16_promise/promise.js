// JS에 질서를 추가!
'use strict'

// // JavaScript ----> TypeScript ( flexible한 JS에 type을 추가했다. )

// // new ---> class!!!
// // request라는 객체 생성.
// let request = new XMLHttpRequest()

// // 127.0.0.1 : Local Loop. 내 컴퓨터에서 바로 요청할 때 쓴다.
// // 모든 컴퓨터는 고유 IP주소 외에 127.0.0.1도 갖고 있다.
// // 5501 : 포트번호

// // WB가 HTTP 프로토콜로 WS에 html파일 요청 ( GET : html파일 달라 )
// // false : 비동기식입니까? ---> false
// request.open('GET', 'http://127.0.0.1:5500/_1_hello_world/hello.html', false)
// request.send(null) // 바로 보낸다.

// // HTTP : WB와 WS 간 통신하는 명령어 집합.

// // request를 보내고 나면, status 값이 바뀐다.
// if (request.status === 200) { // 200 : 서버가 제대로 받았다고 답변해준 값.
//     console.log(request.responseText)
// }


// // // 그냥 쓰면 request의 http 요청이 다 끝난 후에 for loop이 실행된다. ( 동기 ===> 코드가 위에서 아래로 실행. 결과도 그 순서대로. )
// // //  ---> 비동기 실행 필요. 순서 상관없이 동시에 돌린다.
// // for (let i = 0; i < 10; i++) {
// //     console.log(i);
// // }


//  -----------------------------------------------------------------------------------------------------------

// // 비동기식 요청
// //  ===> 코드가 쓰여진 순서와는 상관없이 진행

// let request = new XMLHttpRequest()

// // XMLHttpRequest : event handler ---> 비동기 처리
// // 서버로부터 응답이 왔을 때, 실행될 코드를 지정, 이벤트 핸들러를 지정해서 응답을 처리
// //  Why? ---> 비동기식은 언제 응답이 올지 모르기 때문.
// //   주의) 이벤트 핸들러는 위에 적어야 한다. 서버의 응답이 더 빠르면 인식 못할 수 있기 떄문.
// // onload : on (~할 때) + load (서버로부터 로드)
// // request.onload : 요청에 대한 응답이 로딩될 떄, 이 함수를 실행하라.
// request.onload = () => {
//     if (request.status === 200) {
//         console.log('응답이 제대로 왔음')
//         console.log(request.responseText)
//     }
//     else {
//         console.log('응답이 제대로 오지 않았음')
//     }
// }

// // true : 비동기식입니까? ---> true. request가 비동기로 진행
// request.open('GET', 'http://127.0.0.1:5500/_1_hello_world/hello.html', true)
// request.send(null)

// if (request.status === 200) {
//     console.log(request.responseText)
// }

// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }


//  --------------------------------------------------------------------------------------------


// JavaScript ---> promise ( class이다. )

// // promise형태의 객체 a 생성.
// const a = new Promise((resolve, reject)=>{
//     // 해야 할 일을 지정
//     console.log('hello');

//     // resolve : 다 끝나면 호출해야 하는 함수.
//     // reject : 실패 시 부르는 함수.

//     setTimeout(()=>{
//     resolve('ended') // ended 라는 문자열을 주었다. ( 필요에 따라 다양하게 줄 수 있음. )

//     }, 3000) // 3초 후 실행

//     // resolve('ended') // ended 라는 문자열을 주었다. ( 필요에 따라 다양하게 줄 수 있음. )

// })

// // 약속된 곳에서 기다린다.
// // 약속이 성공적으로 완수되면 resolve후 then이 불린다.
// a
// .then((v)=>{
//     console.log(`then received: ${v}`)
// })

// // promise는 비동기식으로 실행되므로 hello 출력 후, resolve까지 3초 기다리는 동안 for loop이 실행된다.
// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }


// -------------------------------------------------------------------------------------------

// promise를 이용한 비동기 서버 요청
// Promise : fetch ---> promise

// 404란? ---> 서버가 응답은 했는데, 해당 웹 주소가 없다.

// fetch : 서버로부터 web page를 가져오다.
//  fetch가 알아서 resolve, reject까지 처리해준다.
// a는 promise
fetch('http://127.0.0.1:5500/_1_hello_world/hello.html') // 반환값이 promise

    .then((response) => { // fetch가 성공하여 서버로부터 응답이 제대로 왔을 때 실행
        console.log(`서버응답 도착`)
        return response.text() // 주의) 반환값이 문자열이 아님!!! 또다른 promise를 반환한다.
    })
    .then((data) => { // response.text()가 준 promise가 성사됐을 경우
        // resolve로 문자열을 넘겨준다.
        console.log(`문자열로 바꾼 응답: ${data}`)

    })
    .catch((err) => { // catch : reject가 오면 실행
        console.log(`서버응답 에러: ${err}`)
    })

// 비동기 요청과 상관없는 부분이 별도로 실행되는지 확인
for (let i = 0; i < 10; i++) {
    console.log(i);
}