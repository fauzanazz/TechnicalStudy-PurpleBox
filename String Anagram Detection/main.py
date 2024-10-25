def are_anagrams(str1, str2):
    # Input sanitization
    # Ignore spaces and case
    str1 = str1.replace(" ", "").lower()
    str2 = str2.replace(" ", "").lower()

    # Sort the characters in both strings
    sorted_str1 = sorted(str1)
    sorted_str2 = sorted(str2)

    # Compare the sorted strings
    return sorted_str1 == sorted_str2


if __name__ == "__main__":
    print(are_anagrams("listen", "silent"))