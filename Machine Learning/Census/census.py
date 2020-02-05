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
    X_attribute = table
    X_Y_attribute = table
    for item in rules:
        if item == rules[-1]:
            X_Y_attribute = X_attribute[(X_attribute[item[0]] == item[1])]
        else:
            X_attribute = X_attribute[(X_attribute[item[0]] == item[1])]
    
    X_attribute_support = X_attribute.shape[0]/table.shape[0]
    X_Y_attribute_support = X_Y_attribute.shape[0]/table.shape[0]

    rule_confidence = X_Y_attribute_support/X_attribute_support
    
    return rule_confidence
     

def arrangingRules(rules):
    # Write your code here
    table = normalize_csv('Census/census.csv')
    rules_norm = normalize_rules(rules)
    for rule in rules_norm:
        rules_norm[rule] = measure_rule(rules_norm[rule], table)

    sorted_rules = sorted(rules_norm.items(), key=lambda kv: (kv[1], kv[0]), reverse=True)
    return_rules = [rule[0] for rule in sorted_rules]
    return 
    
  
if __name__ == '__main__':
    

    arrangingRules(RULES)
    # print(result)