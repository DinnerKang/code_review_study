#-*- coding: utf-8 -*-

#python2
#http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/

'''
카카오톡 게임별의 하반기 신규 서비스로 다트 게임을 출시하기로 했다. 다트 게임은 다트판에 다트를 세 차례 던져 그 점수의 합계로 실력을 겨루는 게임으로, 모두가 간단히 즐길 수 있다.
갓 입사한 무지는 코딩 실력을 인정받아 게임의 핵심 부분인 점수 계산 로직을 맡게 되었다. 다트 게임의 점수 계산 로직은 아래와 같다.

1. 다트 게임은 총 3번의 기회로 구성된다.
2. 각 기회마다 얻을 수 있는 점수는 0점에서 10점까지이다.
3. 점수와 함께 Single(S), Double(D), Triple(T) 영역이 존재하고 각 영역 당첨 시 점수에서 1제곱, 2제곱, 3제곱 (점수^1 , 점수^2 , 점수^3 )으로 계산된다.
4. 옵션으로 스타상(*) , 아차상(#)이 존재하며 스타상(*) 당첨 시 해당 점수와 바로 전에 얻은 점수를 각 2배로 만든다. 아차상(#) 당첨 시 해당 점수는 마이너스된다.
5. 스타상(*)은 첫 번째 기회에서도 나올 수 있다. 이 경우 첫 번째 스타상(*)의 점수만 2배가 된다. (예제 4번 참고)
6. 스타상(*)의 효과는 다른 스타상(*)의 효과와 중첩될 수 있다. 이 경우 중첩된 스타상(*) 점수는 4배가 된다. (예제 4번 참고)
7. 스타상(*)의 효과는 아차상(#)의 효과와 중첩될 수 있다. 이 경우 중첩된 아차상(#)의 점수는 -2배가 된다. (예제 5번 참고)
8. Single(S), Double(D), Triple(T)은 점수마다 하나씩 존재한다.
9. 스타상(*), 아차상(#)은 점수마다 둘 중 하나만 존재할 수 있으며, 존재하지 않을 수도 있다.

0~10의 정수와 문자 S, D, T, *, #로 구성된 문자열이 입력될 시 총점수를 반환하는 함수를 작성하라.
'''

class game():

    # 생성자 input문자 저장
    def __init__(self, input):
        self.score = 0
        self.prev_score = 0
        self.input = input

    def total_score(self, score):
        self.score = self.score + int(score)

    # 점수 계산을 위한 함수
    def cal_score(self, input):
        if input[-1] == '*':
            power = self.power_score(input[-2])
            prev_score = self.prev_score * 2
            self.total_score(prev_score)
            this_score = (int(input[0:-2]) ** power) * 2
            self.prev_score = this_score

        elif input[-1] == '#':
            power = self.power_score(input[-2])
            self.total_score(self.prev_score)
            this_score = (int(input[0:-2]) ** power) * -1 
            self.prev_score = this_score
        
        else:
            power = self.power_score(input[-1])
            self.total_score(self.prev_score)
            this_score = (int(input[0:-1]) ** power)
            self.prev_score = this_score

    def power_score(self, power):
        if power == 'S':
            return 1
        elif power == 'D':
            return 2
        elif power == 'T':
            return 3

    # 한 묶음으로 나누기
    def split_input(self):

        num_index = list()

        for i in range(len(self.input)):
            if 48 <= ord(self.input[i]) <= 57:
                num_index.append(i)

        return num_index

    def num_index_filter(self, num_index):

        delete_index = list()

        num_len = len(num_index) - 1

        if len(num_index) > 3:
            for i in range(num_len, 0, -1):
                if (num_index[i] - num_index[i-1]) == 1:
                    delete_index.append(i)

        for i in delete_index:
            del num_index[i]

        num_index.append(len(self.input))
        return num_index

    def run(self):
        num_index = self.split_input()
        num_index = self.num_index_filter(num_index)

        for i in range(len(num_index)-1):
            self.cal_score(self.input[num_index[i]:num_index[i+1]])

        self.total_score(self.prev_score)
        print (self.score)
            

if __name__ == "__main__":
    #game = game('1S2D*3T')      #37
    #game = game('1D2S#10S')     #9
    #game = game('1D2S0T')       #3
    #game = game('1S*2T*3S')     #23
    #game = game('1D#2S*3S')     #5
    #game = game('1T2D3D#')      #-4
    game = game('1D2S3T*')      #59

    game.run()
