#pragma once

/*
Converts a string in a the specified base from 1 to 36 to an int

the string may be prefixed with - to indicate that it is negative


*/
bool string_to_number(int& number, const std::wstring& s, unsigned char base);