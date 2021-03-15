#!/bin/python3

import math
import os
import random
import re
import sys
import pandas as pd
import numpy as np

# Complete the moneyFlowIndex function below.


def moneyFlowIndex(filename, n):
    table = pd.read_csv(filename)
    table = table.join(
        pd.DataFrame(
            {
                'Typical Price': table[['High', 'Low', 'Close']].mean(axis=1),
                'Positive Money Flow': np.nan,
                'Negative Money Flow': np.nan,
                'Positive Money Flow Sum': np.nan,
                'Negative Money Flow Sum': np.nan,
                'Money Flow Index': np.nan
            }, index=table.index
        )
    )

    for index in range(1, table.shape[0]):
        if table['Typical Price'][index] > table['Typical Price'][index-1]:
            table.loc[index, 'Positive Money Flow'] = table['Volume'][index] * table['Typical Price'][index]
        else:
            table.loc[index, 'Negative Money Flow'] = table['Volume'][index] * table['Typical Price'][index]

        if index >= n:
            table.loc[index, 'Positive Money Flow Sum'] = table['Positive Money Flow'][index-n+1:index+1].sum(skipna=True)
            table.loc[index, 'Negative Money Flow Sum'] = table['Negative Money Flow'][index-n+1:index+1].sum()
            moneyRatio = table['Positive Money Flow Sum'][index]/table['Negative Money Flow Sum'][index]
            table.loc[index, 'Money Flow Index'] = (moneyRatio/(1+moneyRatio))*100

    table.to_csv(f'money_flow_index_{n}.csv', index=False, float_format='%.6f')


if __name__ == '__main__':
    # filename = input()
    filename = 'sample.csv'
    # n = int(input())
    n = 10
    moneyFlowIndex(filename, n)
