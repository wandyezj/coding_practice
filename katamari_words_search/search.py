
import os


print(__file__)

print(os.path.basename(__file__))



print(os.path.dirname(__file__))

data_source_path = os.path.join(os.path.dirname(__file__), '..', 'data')

print(data_source_path)

data_file_path = os.path.join(data_source_path, "scrabble_words_and_definitions.txt")

print(data_file_path)


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
        
    
def print_dictionary(d):
    for key, value in d.items():
        print(key)
        print(value)


def sort_word(word):
    letters = list(word)
    letters.sort()
    return "".join(letters)

#print(sort_word("cba"))

# get only the words

word_definitions = map_words_definitions(data_file_path)

# sort words into lengths

words = []
for word in word_definitions:
    words.append(word.strip().lower())


# sort words letters

# sort -> words
word_map = {}

for word in words:
    key = sort_word(word)
    value = word

    
    if not key in word_map:
        word_map[key] = []

    word_map[key].append(value)

def print_dictionary_key_values(d):
    for key in d:
        print(key, d[key])


# link ordered letters to words

# {letter: [{subletters}, [words]}
# hits is the number of words that end with that letter
# then search for sets of continuous strings of hits

# create tree of words to fit together

words = list(word_map)
#words.sort()
#print(words[: 10])

word_tree = {}

for word in words:

    current_root = word_tree
    for c in word:

        if not c in current_root:


    # add word to the current root


'''
class Node:
    def __init__(self, 
'''

# Option A

    # group order letters into sets

    # find subset intersecations between sizes and mark as a link

# Option B

    # add each unique letter combination and use it to form a tree each node being the word combination
