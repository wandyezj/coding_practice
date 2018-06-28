// convert_string_to_int.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

/*
	Converts a string in a the specified base from 1 to 36 to an int

	the string may be prefixed with - to indicate that it is negative


*/
bool string_to_number(int& number, const std::wstring& s, unsigned char base)
{
	return false;
}

// Class to contain a test case for the string_to_number function and evaluate it
class string_to_number_test_case
{
public:
	string_to_number_test_case(const std::wstring& input_string, unsigned char input_base, int expected_output_number, bool expected_return);

	bool passed();

	void print_test();

private:
	std::wstring m_input_string;
	unsigned char m_input_base;
	int m_expected_output_number;
	bool m_expected_return;
};

string_to_number_test_case::string_to_number_test_case(const std::wstring& input_string, unsigned char input_base, int expected_output_number, bool expected_return) :
	m_input_string(input_string),
	m_input_base(input_base),
	m_expected_output_number(expected_output_number),
	m_expected_return(expected_return)
{

}

bool string_to_number_test_case::passed()
{
	int output_number = 0;
	bool return_value = string_to_number(output_number, m_input_string, m_input_base);

	return m_expected_return == return_value && m_expected_output_number == output_number;
}


void string_to_number_test_case::print_test()
{
	int output_number = 0;
	bool return_value = string_to_number(output_number, m_input_string, m_input_base);

	std::cout << "case: [" << m_input_string.c_str() << "] [" << m_input_base << "] [" << m_expected_output_number << "] [" << m_expected_return << "] \n";
	
	bool passed = true;

	if (m_expected_output_number != output_number)
	{
		std::cout << "Wrong Output Number: " << m_expected_output_number << " != " << output_number << "\n";
		passed = false;
	}

	if (m_expected_return != return_value)
	{
		std::cout << "Wrong Return Value: " << m_expected_return << " != " << return_value << "\n";
		passed = false;
	}

	std::cout << "\n" << (passed ? "pass" : "FAIL");
	std::cout << std::endl;
}

int main()
{
    return 0;
}

