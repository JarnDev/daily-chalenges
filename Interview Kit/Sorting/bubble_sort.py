# all points


def countSwaps(array):
    step = 0
    # bubble Sort with count
    for i in range(len(array)):
        for j in range(len(array)-1):
            if array[j] > array[j+1]:
                array[j], array[j+1] = array[j+1], array[j]
                step += 1

    print(f"Array is sorted in {step} swaps.\nFirst Element: {array[0]}\nLast Element: {array[-1]}")


if __name__ == "__main__":
    countSwaps([1, 2, 3])
    countSwaps([3, 2, 1])
    countSwaps([4, 2, 3, 1])
