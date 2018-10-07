
import os
import string

print(__file__)

print(os.path.basename(__file__))



print(os.path.dirname(__file__))

data_source_path = os.path.join(os.path.dirname(__file__), '..', 'data')

print(data_source_path)

words_real = "scrabble_words_and_definitions.txt"
words_test = "katamari_test_words.txt"

word_file_name = words_real

data_file_path = os.path.join(data_source_path, word_file_name)

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

words = list(word_map.keys())
#words.sort()
#print(words[: 10])


KEY_WORDS="words" # all the actual words that end in the node
KEY_HITS="hits" # number of actual words that passed this node to go the root

#technically hits should be the count of all words
word_tree = {KEY_WORDS:[], KEY_HITS:-1}


# these are the sorted words
for word in words:

    current_root = word_tree
    leaf_words = word_map[word]


    # go through each sorted letter in the word
    # add the chain of letters until the end
    for letter in word:

        if not letter in current_root:
            # hits is the number of words tha pass this node
            # words are root words that end on this node
            current_root[letter] = {KEY_HITS:0, KEY_WORDS:[]}
            
        current_root[letter][KEY_HITS] += len(leaf_words)
        current_root = current_root[letter]

    current_root[KEY_WORDS].extend(leaf_words)


print("Word Tree: Complete")
#print(word_tree)

# need to be able to nicely print the tree

def print_word_tree(tree, level):
    for letter in string.ascii_lowercase:

        if letter in tree:
            #print('\t'*level, letter)
            print_word_tree(tree[letter], level + 1)


print_word_tree(word_tree, 0)

# link through paths created in the word tree find the longest path
# recursive

def longest_chain(tree, chain):

    node_words = tree[KEY_WORDS]

    # ignore root chain which is ''
    if len(node_words) == 0 and len(chain) > 0:
        return ''

    #print("longest_chain: search sub trees")
    longest_sub_tree_chain = chain
 
    for letter in string.ascii_lowercase:
        #print(letter)
        if letter in tree:
            #print("Found:", letter)
            sub_tree = tree[letter]

            sub_tree_chain = longest_chain(sub_tree, chain + letter)
            
            #print(sub_tree_chain)

            if len(sub_tree_chain) > len(longest_sub_tree_chain):
                longest_sub_tree_chain = sub_tree_chain


    return longest_sub_tree_chain


print("Longest Chain: Start")
chain = longest_chain(word_tree, '')
print("Longest Chain: Complete")
print(chain)



    

        


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
