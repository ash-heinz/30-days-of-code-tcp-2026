class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        nS=set(nums)
        lc=0       
        for i in nS:
            if i-1 not in nS:
                l=1
                while i+l in nS:
                    l+=1
                lc=max(l, lc)
        return lc