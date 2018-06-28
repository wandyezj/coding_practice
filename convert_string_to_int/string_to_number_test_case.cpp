
#include "stdafx.h"

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

	std::wcout << std::boolalpha << "case: [" << m_input_string << "] [" << m_input_base << "] [" << m_expected_output_number << "] [" << m_expected_return << "] \n";

	bool passed = true;

	if (m_expected_output_number != output_number)
	{
		std::wcout << "Wrong Output Number: " << output_number << " != " << m_expected_output_number << "\n";
		passed = false;
	}

	if (m_expected_return != return_value)
	{
		std::wcout << std::boolalpha << "Wrong Return Value: " << return_value << " != " << m_expected_return << "\n";
		passed = false;
	}

	std::wcout << "\n" << (passed ? "pass" : "FAIL") << "\n";
	std::wcout << std::endl;
}