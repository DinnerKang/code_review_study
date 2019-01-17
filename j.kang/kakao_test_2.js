/*카카오톡 게임별의 하반기 신규 서비스로 다트 게임을 출시하기로 했다. 다트 게임은 다트판에 다트를 세 차례 던져 그 점수의 합계로 실력을 겨루는 게임으로, 모두가 간단히 즐길 수 있다.
갓 입사한 무지는 코딩 실력을 인정받아 게임의 핵심 부분인 점수 계산 로직을 맡게 되었다. 다트 게임의 점수 계산 로직은 아래와 같다.

다트 게임은 총 3번의 기회로 구성된다.
각 기회마다 얻을 수 있는 점수는 0점에서 10점까지이다.
점수와 함께 Single(S), Double(D), Triple(T) 영역이 존재하고 각 영역 당첨 시 점수에서 1제곱, 2제곱, 3제곱 (점수^1 , 점수^2 , 점수^3 )으로 계산된다.
옵션으로 스타상(*) , 아차상(#)이 존재하며 스타상(*) 당첨 시 해당 점수와 바로 전에 얻은 점수를 각 2배로 만든다. 아차상(#) 당첨 시 해당 점수는 마이너스된다.
스타상(*)은 첫 번째 기회에서도 나올 수 있다. 이 경우 첫 번째 스타상(*)의 점수만 2배가 된다. (예제 4번 참고)
스타상(*)의 효과는 다른 스타상(*)의 효과와 중첩될 수 있다. 이 경우 중첩된 스타상(*) 점수는 4배가 된다. (예제 4번 참고)
스타상(*)의 효과는 아차상(#)의 효과와 중첩될 수 있다. 이 경우 중첩된 아차상(#)의 점수는 -2배가 된다. (예제 5번 참고)
Single(S), Double(D), Triple(T)은 점수마다 하나씩 존재한다.
스타상(*), 아차상(#)은 점수마다 둘 중 하나만 존재할 수 있으며, 존재하지 않을 수도 있다.
0~10의 정수와 문자 S, D, T, *, #로 구성된 문자열이 입력될 시 총점수를 반환하는 함수를 작성하라.

입력 형식
“점수|보너스|[옵션]”으로 이루어진 문자열 3세트.
예) 1S2D*3T

점수는 0에서 10 사이의 정수이다.
보너스는 S, D, T 중 하나이다.
옵선은 *이나 # 중 하나이며, 없을 수도 있다.
출력 형식
3번의 기회에서 얻은 점수 합계에 해당하는 정수값을 출력한다.
예) 37
*/

const dart_result = '1D2S3T*';
let result_slice = dart_result.split('');

console.log(result_slice);

let answer = 0;

function playDart() {

    function dart() {
        let data = '';
        for (let i = 0; i < result_slice.length; i++) {
            let isNumber = Number(result_slice[i]);

            if (isNaN(isNumber) == false) {
                data = data + isNumber;
                delete result_slice[i];
            } else {
                data = data + result_slice[i];
                delete result_slice[i];
                if (result_slice[i + 1] == '*' || result_slice[i + 1] == '#') {
                    data = data + result_slice[i + 1];
                    delete result_slice[i + 1];
                    break;
                }
                break;
            }
        }
        result_slice = result_slice.filter(n => n);
        console.log(result_slice);
        return data;
    }

    function calc(val, event) {
        console.log(val);
        let val_arr = val.split('');
        let number = 0;
        console.log(val_arr);
        if (isNaN(Number(val_arr[1])) == false) {
            number = 10;
            delete val_arr[1];
            val_arr = val_arr.filter(n => n);
        } else {
            number = val_arr[0];
        }

        if (val_arr[1] == 'S') {
            number = Math.pow(number, 1);
        } else if (val_arr[1] == 'D') {
            number = Math.pow(number, 2);
        } else if (val_arr[1] == 'T') {
            number = Math.pow(number, 3);
        }


        if (val_arr[2] == '*') {
            number = number * 2;
            if (event == 'second') {
                number = number + first_data;
            } else if (event == 'third') {
                number = number + second_data;
            }
        }else if(val_arr[2] == '#'){
            number = number * -1;
        }
        if(event == 'first'){
            first_data = number;
        }else if (event == 'second'){
            second_data = number;
        }
        return number;
    }

    let first = dart();
    let second = dart();
    let third = dart();

    let first_data = 0;
    let second_data = 0;


    answer = calc(first, 'first')  + calc(second, 'second') + calc(third, 'third');
    console.log(answer);
    return answer;
}

playDart();