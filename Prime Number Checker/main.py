def is_prime(num: int) -> bool:
    if num <= 0:
        raise ValueError("The number must be greater than 0.")
    if num <= 1:
        return False
    if num <= 3:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    return True

if __name__ == "__main__":
    n = int(input("Enter a number: "))
    print(is_prime(n))