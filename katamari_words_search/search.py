
import os
import string

#helper functions no namespace required
import search_helpers as search_helpers



word_file_name = search_helpers.FILE_WORDS_TEST

data_file_path = search_helpers.get_data_file_path(word_file_name)

print(data_file_path)


    

#print(sort_word("cba"))

# get only the words

word_definitions = search_helpers.map_words_definitions(data_file_path)

# sort words into lengths

words = []
for word in word_definitions:
    words.append(word.strip().lower())


# sort words letters

# sort -> words
word_map = {}

for word in words:
    key = search_helpers.sort_word(word)
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


KEY_HITS="hits" # number of actual words that consider this their leaf node.

#technically hits should be the count of all words
word_tree = { KEY_HITS: len(words)}

# unfortunantly this will destroy memory worst case 26 ^ (max word length)
# these are the sorted words
for word in words:

    current_root = word_tree
    leaf_words = word_map[word]

    # need to rotate the word to get every combination
    for word_permutation in search_helpers.unique_permutations(word):

        # go through each sorted letter in the word
        # add the chain of letters until the end
        for letter in word_permutation:

            if not letter in current_root:
                # hits is the number of words tha pass this node
                # words are root words that end on this node
                current_root[letter] = {KEY_HITS:0}

            current_root = current_root[letter]

        current_root[KEY_HITS] += 1


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

# n

def longest_chain(tree, chain):

    node_hits = tree[KEY_HITS]

    # ignore root chain which is ''
    if node_hits == 0 and len(chain) > 0:
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


'''
Will the tree method work?

Possibly not, example:

aab
ab

ab -> aab is a valid path

longer words do not just have one path, they will always be N deep in the tree but they have C paths to get there
where C is the combination of different letter scrambles that may be made front the word.

Similarly need to search all subchains not just subchains from the root.




'''

        

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
