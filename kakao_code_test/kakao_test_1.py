'''
1. 비밀 지도(난이도: 하)
네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다. 그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다. 다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.

지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 “공백”(“ “) 또는 “벽”(“#”) 두 종류로 이루어져 있다.
전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 “지도 1”과 “지도 2”라고 하자. 지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다. 지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.
“지도 1”과 “지도 2”는 각각 정수 배열로 암호화되어 있다.
암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.
http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
'''
import random
import math


n = int(input('한변의 길이를 입력하시오 (5, 6 추천)'))



arr_1 = []
arr_2 = []
hex_arr_1 = []
hex_arr_2 = []
result_arr =[]

# 문자열로 저장
for x in range(0,n):
    arr_1.append(random.randrange(0, int(math.pow(2,n))))
    arr_2.append(random.randrange(0, int(math.pow(2,n))))
    result_arr= [''] * n
    

print('사각형 1 : ',arr_1)
print('사각형 2 : ',arr_2)


# 자리수 맞춰주는 함수
#[2:]는 2진수가 0b 부터 시작하기 때문에 0b 없애고 저장
# 바이너리 변환 참고
# https://stackoverflow.com/questions/16926130/convert-to-binary-and-keep-leading-zeros-in-python
def setCiphers(number, length):
    return format(number, '#0{}b'.format(length + 2))[2:]


# 2진법으로 만들어 배열 넣기
for i in range(0,n):
    hex_arr_1.append(setCiphers(arr_1[i], n))
    hex_arr_2.append(setCiphers(arr_2[i], n))

print('2진법 사각형 1 : ',hex_arr_1)
print('2진법 사각형 2 : ',hex_arr_2)


for a in range(0, n):
    for z in range(0, n):
        if hex_arr_1[a][z:z+1] == '1' or hex_arr_2[a][z:z+1] == '1':
            result_arr[a] = result_arr[a] + '#'
        else:
            result_arr[a] = result_arr[a] + ' '

print('정답 배열 : ',result_arr)
for y in range(0, n):
    print(result_arr[y])