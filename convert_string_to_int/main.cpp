// convert_string_to_int.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

int main()
{
	// List out the test cases
	std::vector<string_to_number_test_case> test_cases{ {
		// input string, input base, expected value, expected return

		// test positive and negative
		{L"1", 10, 1, true},  
		{L"-1", 10, -1, true},
		
		// test boundaries
		{ L"0", 16, 0, true },
		{ L"-0", 16, 0, true },
	    { L"A", 16, 10, true },
		{ L"-A", 16, -10, true},
		{ L"a", 16, 10, true},
		{ L"-a", 16, -10, true},
		{ L"Z", 36, 35, true },
		{ L"-Z", 36, -35, true },
		{ L"z", 36, 35, true },
		{ L"-z", 36, -35, true },

		// Allowable base range [0,36]
		{ L"A", 0, 0, false },
		{ L"A", 37, 0, false },

		// Allowable character range dependent upon base
		{ L"1", 1, 0, false },
		{ L"0", 1, 0, true },

		// char acceptable boundaries (these change depending on the type)
		{ L"127", 10, 127, true }, // can max positive value be assigned?
		{ L"-128", 10, -128, true }, // can max negative value be assigned?

		// char beyond acceptable boundaries
		{ L"128", 10, 0, false },
		{ L"-129", 10, 0, false },

		// Invalid string
		{ L"-", 10, 0, false },

		// Overflow conditions
		// TODO: test cases that have excessive numbers or characters

		} };

	for (auto test : test_cases)
	{
		test.print_test();
	}

    return 0;
}

