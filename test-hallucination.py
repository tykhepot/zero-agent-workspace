# Zero's Intentional Hallucinated Code (Test Case) 🦞
# This code contains deliberate bugs that Coder Agent should catch!

def fibonacci(n):
    """Calculate nth Fibonacci number - with intentional bug"""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    
    # BUG 1: Wrong initialization (should be [0, 1], not [1, 1])
    fib = [1, 1]  
    
    for i in range(2, n):
        # BUG 2: Off-by-one error (wrong index)
        fib.append(fib[i-1] + fib[i-3])  # Should be fib[i-1] + fib[i-2]
    
    return fib[-1]

# Test cases
print("Fibonacci(0):", fibonacci(0))  # Expected: 0, might get wrong due to bug
print("Fibonacci(5):", fibonacci(5))  # Expected: 5 (sequence: 0,1,1,2,3,5)
print("Fibonacci(10):", fibonacci(10))  # Expected: 55

# BUG 3: Missing edge case handling for negative numbers
def factorial(n):
    """Calculate n! - with intentional bug"""
    if n == 0 or n == 1:
        return 1
    
    result = 1
    # BUG 4: Wrong loop range (should be range(2, n+1), not range(1, n))
    for i in range(1, n):  
        result *= i
    
    return result

print("Factorial(5):", factorial(5))  # Expected: 120, might get wrong due to bug
