

'''

Strategy:

To avoid blowing up the memory only map between two layers at a time then combine the layers.

'''


#helper functions no namespace required
import search_helpers

word_file_name = search_helpers.FILE_WORDS_REAL


data_file_path = search_helpers.get_data_file_path(word_file_name)

# word -> definition
word_definitions = search_helpers.map_words_definitions(data_file_path)

# sorted word -> words
sorts_words = search_helpers.map_sort_words(word_definitions)

#search_helpers.print_dictionary(words)

'''

Map keys to length of the key



'''

sorts = list(sorts_words.keys())

sorts.sort()

# length -> sorted words of that length
length_words = []

for word in sorts:

    word_length = len(word)

    # extend the word lengths if required
    while len(length_words) <= word_length:
        length_words.append([])

    length_words[word_length].append(word)


def sum_word_counts(words, lookup):
    s = 0
    for word in words:
        s += len(lookup[word])
    return s

'''
See for each length:

* Total unique sorts
* Total number fo words mapped to sorts

This shows the reduction in the number of words

'''
for i in range(len(length_words)):

    length_sorts = length_words[i]

    total_unique_sorts = len(length_sorts)
    total_mapping = sum_word_counts(length_sorts, sorts_words)
    print(i, total_unique_sorts, total_mapping)

print(length_words[2])

'''

Now find 

'''





