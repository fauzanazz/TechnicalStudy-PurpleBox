import re


def is_palindrome(s: str) -> bool:
    # Remove non-alphanumeric characters and convert to lowercase
    cleaned_s = re.sub(r'[^a-zA-Z0-9]', '', s).lower()

    # Compare the cleaned string with its reverse
    return cleaned_s == cleaned_s[::-1]


if __name__ == "__main__":
    print(is_palindrome("A man, a plan, a canal, Panama"))  # Output: True
    print(is_palindrome("racecar"))  # Output: True
    print(is_palindrome("hello world"))  # Output: False


