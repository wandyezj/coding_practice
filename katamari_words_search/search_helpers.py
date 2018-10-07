


import os
import itertools

FILE_WORDS_REAL = "scrabble_words_and_definitions.txt"
FILE_WORDS_TEST = "katamari_test_words.txt"

def unique_permutations(word):
    permutations = itertools.permutations(word)

    unique_permutations = set(permutations)

    return unique_permutations


def print_dictionary(d):
    for key, value in d.items():
        print(key)
        print(value)

def print_list(l):
    for i in l:
        print(l)

def sort_word(word):
    letters = list(word)
    letters.sort()
    return "".join(letters)

def map_sort_words(words):
    '''
    takes an iterable of words and maps them to a sorted key

    Example
        All permutations of abc are mapped to a key of abc.
    '''
    word_map = {}

    for word in words:
        key = sort_word(word)
        value = word

        if not key in word_map:
            word_map[key] = []

        word_map[key].append(value)

    return word_map


def get_data_file_path(file_name):

    data_source_path = os.path.join(os.path.dirname(__file__), '..', 'data')

    data_file_path = os.path.join(data_source_path, file_name)

    return data_file_path

def map_words_definitions(file_path):

    f = open(file_path)

    # skip header
    f.readline()
    
    word_definitions = {}
    for line in f:
        l = line.strip()

        if l == '':
            continue

        word, definition = line.split('\t')

        #word = word.tolower()
        word_definitions[word] = definition

    f.close()

    return word_definitions
        