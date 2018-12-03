/*
1. 비밀 지도(난이도: 하)
네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다. 그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다. 다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.

지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 “공백”(“ “) 또는 “벽”(“#”) 두 종류로 이루어져 있다.
전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 “지도 1”과 “지도 2”라고 하자. 지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다. 지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.
“지도 1”과 “지도 2”는 각각 정수 배열로 암호화되어 있다.
암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.
http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
*/


// 한변의 길이가 n
const n = 5;

let arr_1 = [];
let arr_2 = [];
let hex_arr_1 = [];
let hex_arr_2 = [];
let result_arr = [];

// 2의 n 승 -1 을 랜덤함수로 배열에 저장
for (let x = 0; x < n; x++) {
    arr_1.push(Math.floor(Math.random() * (Math.pow(2, n) - 1)));
    arr_2.push(Math.floor(Math.random() * (Math.pow(2, n) - 1)));
}

// 로그로 배열 2개 보여주기
console.log(arr_1);
console.log(arr_2);

// 2진수로 바꿔서 배열에 넣기
for (let i = 0; i < n; i++) {
    hex_arr_1.push(ciphers(arr_1[i].toString(2), n));
    hex_arr_2.push(ciphers(arr_2[i].toString(2), n));
    result_arr[i] = '';
}

// number -> 숫자
// ciphers -> 자릿수
// 10진수 1인 경우 2진수 00001 로 만들어 주는 함수
function ciphers(number, ciphers) {
    while (number.length < ciphers) {
        number = 0 + number;
    }
    return number;
}
// 0인지 1인지 비교해서 # 넣기
for (let a = 0; a < n; a++) {
    for (let z = 0; z < n; z++) {
        if (hex_arr_1[a].substring(z, z + 1) == '1' || hex_arr_2[a].substring(z, z + 1) == '1') {
            result_arr[a] = result_arr[a] + '#'
        } else {
            result_arr[a] = result_arr[a] + ' '
        }
    }
}

// 결과 배열
console.log(result_arr);