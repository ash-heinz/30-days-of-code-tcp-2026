class Solution:
    def countGoodNumbers(self, n: int) -> int:
        MOD = 10**9 + 7
        count_odd = n // 2
        count_even = (n + 1) // 2
        even_part = pow(5, count_even, MOD)
        odd_part = pow(4, count_odd, MOD)
        
        return (even_part * odd_part) % MOD