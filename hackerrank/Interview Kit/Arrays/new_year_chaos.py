# all correct
def minimumBribes(q):
    a = list(range(1, len(q)+1))
    b = q
    check = [a[i]-b[i] for i in range(len(q))]
    step = 0
    for i in check:
        if i <= -3:
            print("Too chaotic")
            return

    while any(check):
        while any([True for i in check if i > 0]):
            for i in range(len(check)):
                if check[i] > 0:
                    check[i], check[i-1] = check[i-1] + 1, check[i]-1
                    step += 1
        while any([True for i in check if i < 0]):
            for i in range(len(check)):
                if check[i] < 0:
                    check[i], check[i+1] = check[i+1] - 1, check[i]+1
                    step += 1

    print(step)


if __name__ == "__main__":
    minimumBribes([1, 2, 5, 3, 7, 8, 6, 4])
