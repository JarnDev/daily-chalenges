#!/bin/python3

import math
import os
import random
import re
import sys
import json
import pandas as pd
import itertools
import time
import numpy as np
#
# Complete the 'arrangingRules' function below.
#
# The function is expected to return a STRING_ARRAY.
# The function accepts STRING_ARRAY rules as parameter.
#

def normalize_csv(csv):
    table = pd.read_csv(csv)
    table.columns = [item.split('=')[0] for item in table.columns.values.tolist()]
    table = table.applymap(lambda x: x.split('=')[1])
    return table


# def attributesSet(numberOfAttributes, supportThreshold):
#     # Write your code here
#     table = normalize_csv('census.csv')

#     support_list = []
#     for index, comb in enumerate(itertools.combinations(table.columns, numberOfAttributes)):
#         table2 = table.groupby(comb).size().reset_index().rename(columns={0:'count'})
#         table2 = table2.loc[table2['count']/table.shape[0] >= supportThreshold]
#         rule = []
#         if not table2.empty:
#             for i, row in table2.iterrows():
#                 [rule.append(f'{item}={row[item]}') for item in comb]
#             support_list.append(','.join(rule))
        
#     return support_list

def attributesSet(numberOfAttributes, supportThreshold):
    table = normalize_csv('Census/census.csv')
    full_size = supportThreshold*table.shape[0]
    support_list = []
    interop = itertools.combinations(table.columns, numberOfAttributes)
    for comb in interop:
        table2 = table.groupby(list(comb)).size().reset_index().rename(columns={0:'count'})
        table2 = table2.loc[table2['count'].values >= full_size]
        
        if not table2.empty:
            support_list.append(','.join(np.array(comb, dtype=np.object)+'='+np.array(table2.values.tolist()[0][:-1], dtype=np.object)))
    return support_list
    

  
if __name__ == '__main__':
    
    timer = time.time()
    result = attributesSet(7, 0.1)
    print(result)
    print(time.time()-timer)