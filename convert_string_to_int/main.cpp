// convert_string_to_int.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

int main()
{
	// List out the test cases
	std::array<string_to_number_test_case, 2> test_cases{ {
		// input string, input base, expected value, expected return
		{L"1", 10, 1, true},  
		{L"-1", 10, -1, true}
		} };

	for (auto test : test_cases)
	{
		test.print_test();
	}

    return 0;
}

