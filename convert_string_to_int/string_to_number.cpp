#include "stdafx.h"

bool character_to_number(number_type& number, wchar_t c)
{
	if (c >= L'0' && c <= L'9')
	{
		number = c - L'0';
		return true;
	}

	if (c >= L'a' && c <= L'z')
	{
		number = c - L'a' + 10;
		return true;
	}
	
	if (c >= L'A' && c <= L'Z')
	{
		number = c - L'A' + 10;
		return true;
	}

	return false;
}

bool overflow_safe_add_positive(number_type& out, number_type a, number_type b)
{
	// not designed to handle negative conditions
	if (a < 0 || b < 0)
	{
		return false;
	}

	// ensure that there is enough space for the type to exist
	if (std::numeric_limits<number_type>::max() - a >= b)
	{
		out = a + b;
		return true;
	}

	return false;
}


// Choosing the philosophy of being absolutely correct over efficiency
// It's possible to optimize by avoiding edge cases
bool string_to_number(number_type& number, const std::wstring& s, unsigned char base)
{
	// potentially could just string compare on the maximum or minimum value and see if the string is greater than min or max string return (but this would need to be base specific) (possibly easier than overflow return).

	// default number for consistent behavior
	number = 0;

	// check for an empty string
	if (s.length() == 0)
	{
		return false;
	}

	// check if base is in a valid range
	if (base == 0 || base > max_base)
	{
		return false;
	}

	// loop backwards over the letters converting them to the base
	number_type position_base_multiplier = 1;
	number_type total = 0;

	bool is_signed = s[0] == L'-';

	if (s.length() == 1 && is_signed)
	{
		return false;
	}

	int boundary = is_signed ? 1 : 0;

	size_t current_index = s.length();

	while(current_index > boundary)
	{
		current_index--;
		wchar_t c = s[current_index];

		number_type position_number;

		// check if the character is even a valid number
		if (!character_to_number(position_number, c))
		{
			return false;
		}

		// only numbers up the the base are allowed in the string
		if (position_number >= base)
		{
			return false;
		}

		// TODO: check for overflow
		number_type place_value = position_number * position_base_multiplier;

		if (!overflow_safe_add_positive(total, total, place_value))
		{
			return false;
		}

		// not needed on the last iteration (no need to fail on potential overflow)
		if (current_index != boundary)
		{
			// TODO: check for overflow 
			position_base_multiplier *= base;

		}
	}

	// handle negative
	if (is_signed)
	{
		// TODO: check that negatives are ok for the number type
		// TODO: check that there is enough room for the current number to be flipped (extream edge case)
		total = 0 - total;
	}

	number = total;

	return true;
}