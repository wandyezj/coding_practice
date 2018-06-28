#pragma once


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