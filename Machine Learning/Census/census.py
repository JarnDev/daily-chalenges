#!/bin/python3

import math
import os
import random
import re
import sys
import json
import pandas as pd

RULES = ['{native-country=United-States,capital-gain=None}=>{capital-loss=None}', 
'{capital-gain=None,capital-loss=None}=>{native-country=United-States}', 
'{native-country=United-States,capital-loss=None}=>{capital-gain=None}'
]

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

def normalize_rules(rules):
    n_rules = {}
    for rule in rules:
        splitted_rule = re.sub('[\{\}]', '', rule)
        splitted_rule = re.sub('=>', ',', splitted_rule).split(',')
        for index, item in enumerate(splitted_rule):
            splitted_rule[index] = item.split('=')
        n_rules[rule] = splitted_rule
    return n_rules

def measure_rule(rules, table):
    # print(rules[0][0])
    # for rule in rules:
    for item in rules:
        if item == rules[-1]:
            print('OK')


    # print(table[(table[rules[0][0]] == rules[0][1]) & (table['sex'] == 'Male')].shape)
    # break


def arrangingRules(rules):
    # Write your code here
    table = normalize_csv('Census/census.csv')
    rules_norm = normalize_rules(rules)
    for rule in rules_norm:
        measure_rule(rules_norm[rule],table)
        break
        # print(rules_norm[rule])
    # tabe_t = re.sub('[\{\}]', '', rules[0]).split('=>')
    # print(table.head())
    # for rule in rules:
    #     print(rule.split('=>'))
    #     rules_2 = rule.split('=>')
    #     print(eval(rules[0]))
            
    #     break
    
   
  
if __name__ == '__main__':
    

    arrangingRules(RULES)
    # print(result)