#-*- coding: utf-8 -*-

#python2
#http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/

'''
네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다. 그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다. 다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.

지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 “공백”(“ “) 또는 “벽”(“#”) 두 종류로 이루어져 있다.
전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 “지도 1”과 “지도 2”라고 하자. 지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다. 지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.
“지도 1”과 “지도 2”는 각각 정수 배열로 암호화되어 있다.
암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.

입력 형식
입력으로 지도의 한 변 크기 n 과 2개의 정수 배열 arr1, arr2가 들어온다.

1 ≦ n ≦ 16
arr1, arr2는 길이 n인 정수 배열로 주어진다.
정수 배열의 각 원소 x를 이진수로 변환했을 때의 길이는 n 이하이다. 즉, 0 ≦ x ≦ 2^n - 1을 만족한다.
출력 형식
원래의 비밀지도를 해독하여 "#", 공백으로 구성된 문자열 배열로 출력하라.
'''

class map(object):
    
    array_len = None
    
    def list_make(self, array_len):

        if array_len <= 16:
            self.array_len = array_len
            return_list = [None] * array_len

            return return_list, return_list
        else:
            print ('error')
            exit()

    def check_num(self, num):
        if 0 <= num <= (math.pow(2, self.array_len) - 1):
            return True
        else:
            return False

    def convert_bin(self, num_list1, num_list2):
        for i in range(self.array_len):
            num_list1[i] = bin(num_list1[i])[2:].zfill(self.array_len)
            num_list2[i] = bin(num_list2[i])[2:].zfill(self.array_len)

        return num_list1, num_list2

    def num_or(self, num1, num2):

        result_list = [''] * self.array_len

        for i in range(self.array_len):
            for j in range(self.array_len):
                if num1[i][j] == '0' and num2[i][j] == '0':
                    temp = ' '
                else:
                    temp = '#'
                result_list[i] = result_list[i] + temp

        return result_list

if __name__ == "__main__":
    map = map()

    print ('배열 길이 입력(0~16) : ')
    array_len = input()
    array_1, array_2 = map.list_make(array_len)

    print ('첫번째 배열 입력([]안에 ,로 구분) : ')
    input_1 = input()

    print ('두번째 배열 입력([]안에 ,로 구분) : ')
    input_2 = input()

    input_1, input_2 = map.convert_bin(input_1, input_2)
    result = map.num_or(input_1, input_2)

    print result