# all correct
def rotLeft(a, d):
    for _ in range(d):
        item = a.pop(0)
        a.append(item)
    return a
