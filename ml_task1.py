# 1. Python Basics & Control Structures

fruits = ["apple", "banana", "grape", "kiwi", "orange"]

print("Task 1: Filter & Print Fruit Lengths")
for fruit in fruits:
    if len(fruit) > 5:
        print(f"The fruit {fruit} has {len(fruit)} characters.")

# 2. Functions & Lambda

print("\nTask 2: Numbers Greater than Threshold")

def filter_numbers_greater_than(lst, threshold):
    return list(filter(lambda x: x > threshold, lst))

numbers = [1, 5, 10, 3, 8]
print(filter_numbers_greater_than(numbers, 5))  # Expected: [10, 8]

# 3. Object-Oriented Programming (OOP)

print("\nTask 3: BankAccount Class")

class BankAccount:
    def __init__(self, account_number, owner, balance=0):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"{self.owner} deposited {amount}. New balance: {self.balance}")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            print(f"{self.owner} withdrew {amount}. New balance: {self.balance}")
        else:
            print("Invalid withdrawal amount.")

    def transfer(self, amount, other_account):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            other_account.balance += amount
            print(f"Transferred {amount} from {self.owner} to {other_account.owner}")
        else:
            print("Transfer failed. Check amount and balance.")

    def __str__(self):
        return f"BankAccount({self.account_number}, Owner: {self.owner}, Balance: {self.balance})"

# Example usage:
account_a = BankAccount("A123", "Alice", 1000)
account_b = BankAccount("B456", "Bob", 500)

account_a.deposit(200)
account_a.transfer(300, account_b)
print(account_a)
print(account_b)

# 4. Exception Handling

print("\nTask 4: Divide Numbers with Exception Handling")

def divide_numbers(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Invalid input, please enter numbers"

print(divide_numbers(10, 2))    
print(divide_numbers(10, 0))    
print(divide_numbers("ten", 2)) 

# 5. Python Modules & File Handling

print("\nTask 5: Students with Marks > 80")

# Creating file
with open("students.txt", "w") as file:
    file.write("Alice 90\n")
    file.write("Bob 85\n")
    file.write("Charlie 70\n")
    file.write("David 95\n")

# Reading file and filtering
with open("students.txt", "r") as file:
    for line in file:
        name, marks = line.strip().split()
        if int(marks) > 80:
            print(name)

# 6. Regular Expressions

print("\nTask 6: Extract Phone Numbers")

import re

def extract_phone_numbers(text):
    pattern = r"\+91-\d{10}"
    return re.findall(pattern, text)

sample_text = (
    "For any support regarding our Bangalore office, call us at +91-9876543210 between 9 AM to 6 PM. "
    "If you are located in Mumbai, you can also reach our helpdesk at 9123456789 for urgent assistance. "
    "Additionally, our Delhi branch can be contacted at +91-9988776655 during weekdays."
)

print(extract_phone_numbers(sample_text)) 