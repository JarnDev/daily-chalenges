# All points
def checkMagazine(magazine, note):
    try:
        [magazine.pop(magazine.index(n_word)) for n_word in note]
    except Exception:
        return print("No")
    print("Yes")


if __name__ == '__main__':
    checkMagazine(['give', 'me', 'one', 'grand', 'today', 'night'], ['give', 'one', 'grand', 'today'])
    checkMagazine(['two', 'times', 'three', 'is', 'not', 'four'], ['two', 'times', 'two', 'is', 'four'])
