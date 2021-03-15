# 9 out fo 15
def arrayManipulation(n, queries):
    start_arr = [0]*n

    for start, finish, value in queries:
        start_arr = [start_arr[index]+value if start <= index+1 <= finish else start_arr[index] for index in range(len(start_arr))]

    return max(start_arr)


if __name__ == "__main__":
    arrayManipulation(5, [[1, 2, 100], [2, 5, 100], [3, 4, 100]])
