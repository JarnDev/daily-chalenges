# all correct
def hourglassSum(arr):
    hourglass = set([(0, 0), (0, 1), (0, 2), (1, 1), (2, 0), (2, 1), (2, 2)])
    x_offset = 4
    y_offset = 4
    hourglassS = list()
    for x in range(x_offset):
        for y in range(y_offset):
            unit = 0
            for pos in hourglass:
                unit += arr[pos[0]+x][pos[1]+y]
            hourglassS.append(unit)

    return max(hourglassS)
