#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int min_size, target_size, half1_len, half2_len, count = 0;

int findSmallestDivisor(char *s, char *t)
{
    char *t2, *s2, *half1, *half2, *tmp;
    strcpy(t2, t);
    strcpy(s2, s);

    if (strlen(s) % strlen(t) != 0 || strstr(s, t) == NULL)
    {
        //divisor maior que o dividendo
        return -1;
    }

    if (strlen(t) % 2 != 0)
    {
        while (s2 = strstr(s2, t))
        {
            count++;
            s2 += strlen(t);
        }

        if (strlen(s) % strlen(t) == 0 && strlen(s) / strlen(t) == count)
        {
            return strlen(t);
        }
        return -1;
    }

    do
    {

        half1_len = strlen(t2) / 2;
        half1 = malloc(half1_len + 1);
        strncpy(half1, t2, half1_len);
        half1[half1_len] = '\0';

        half2_len = strlen(t2) - half1_len;
        half2 = malloc(strlen(t2) / 2 + 1);
        strncpy(half2, t2 + strlen(half1), half2_len);
        half2[half2_len] = '\0';
        strcpy(t2, half1);

    } while (strlen(half1) % 2 == 0 && strcmp(half1, half2) == 0);

    if (strcmp(half1, half2) != 0)
    {
        return strlen(half1) + strlen(half2);
    }

    return strlen(half1);
}

int main(void)
{

    char *s = "bcddcb";

    char *t = "bcd";

    int result = findSmallestDivisor(s, t);

    printf("%d\n", result);

    return 0;
}
