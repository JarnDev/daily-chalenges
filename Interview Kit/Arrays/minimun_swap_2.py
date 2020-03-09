# all correct
def minimumSwaps(arr):
    step = 0
    while 1:
        dif = True
        for index, item in enumerate(arr):
            if index != item-1:
                arr[index], arr[item-1] = arr[item-1], arr[index]
                step += 1
                dif = False
        if dif:
            break
    return step


if __name__ == "__main__":
    minimumSwaps([7, 1, 3, 2, 4, 5, 6])
    minimumSwaps([2, 3, 4, 1, 5])
