import math
class Solution:
    def nthUglyNumber(self, n: int, a: int, b: int, c: int) -> int:
        def lcm(x, y):
            return (x * y) // math.gcd(x, y)
        ab = lcm(a, b)
        ac = lcm(a, c)
        bc = lcm(b, c)
        abc = lcm(a, bc)
        def count_ugly(num):
            return (num // a) + (num // b) + (num // c) \
                   - (num // ab) - (num // ac) - (num // bc) \
                   + (num // abc)
        low = 1
        high = n * min(a, b, c)
        while low < high:
            mid = (low + high) // 2
            if count_ugly(mid) < n:
                low = mid + 1
            else:
                high = mid
        return low