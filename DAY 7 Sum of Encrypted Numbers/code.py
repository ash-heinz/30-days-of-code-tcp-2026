def encyrptmultiplier(num: int) -> int:
    i=0
    x=0
    while i < len(str(num)):
        x += 1 * (10 ** i)
        i += 1
    return x
class Solution:
    def sumOfEncryptedInt(self, nums: List[int]) -> int:
        total_sum = 0
        for num in nums:
            encrypted_num = 0
            max_digit = max(int(digit) for digit in str(num))
            for digit in str(num):
                encrypted_num =  max_digit * encyrptmultiplier(int(num))
            total_sum += encrypted_num
        return total_sum
