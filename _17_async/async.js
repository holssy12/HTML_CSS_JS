'use strict'

// async : syntactic sugar for promise
// 그냥 쓰기에는 어려운 promise를 문법적으로 쓰기 쉽게 한다.

/*
    C언어 예시

    int k = 0;
    if ( k > 1 ) k = 3;
    else k = 0;

    위 코드에 syntactic sugar를 첨가해
    k = (k < 1) ? 3 : 0; 

*/

// // // 원본 코드
// // function fetchUser() {
// //     return new Promise((resolve, reject) => {
// //         console.log(`Promise 실행`)
// //         resolve('실행끝')
// //     })
// // }

// // syntactic sugar : async ---> 무조건 promise를 return.
// async function fetchUser(a) {
//     console.log(`Promise 실행`) // 원래 실행해야 하는 부분
//     return '실행끝' // resolve에 해당
// }


// // 아래는 변하지 않음
// const a = fetchUser()

// a
// .then((v)=>{
//     console.log(`fetchUser result: ${v}`)
// })


//  --------------------------------------------------------------------


// async를 이용하지 않아도, B는 promise를 반환한다.
function B() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(`B가 실행됨`)
            resolve(45)
        }, 3000)
    })
}

async function fetchUser(a) {
    console.log(`Promise 실행`)

    // await : async 안에서만 사용 가능한 문법.
    //         promise 안에 있는 또다른 promise의 종료를 기다릴 때 사용 가능 ---> 동기
    const k = await B() // await이 없으면 k가 resolve를 받기 전에, a로 가버린다. ---> 비동기

    if (k >= 0) return '실행끝' // return -> resolve
    else {
        throw new Error('음수') // Error라는 class가 있다.
                                // throw -> reject
    }

}

const a = fetchUser(10) // 양수 -> resolve
// const a = fetchUser(-10) // 음수 -> reject
a
.then((v)=>{
    console.log(`fetchUser result: ${v}`)
})
.catch((error)=>{
    console.log(`에러발생: ${error}`)
})
.finally(()=>{
    // resolve 혹은 reject에 상관없이
    // promise가 종료되면서 공통적으로 실행되야 하는 부분
    console.log(`promise 끝 from finally`)
})
