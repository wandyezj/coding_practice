#pragma once


typedef int number_type;

const unsigned char max_base = 36;

/*
Converts a string in a the specified base from 1 to 36 to an int

the string may be prefixed with - to indicate that it is negative


*/
bool string_to_number(number_type& number, const std::wstring& s, unsigned char base);