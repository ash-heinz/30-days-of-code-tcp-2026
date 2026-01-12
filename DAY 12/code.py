class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        
        def binary_search(nums, target, searchl):
            l = 0
            r = len(nums) - 1
            idx = -1
            
            while l <= r:
                mid = (l + r) // 2
                
                if nums[mid] > target:
                    r = mid - 1
                elif nums[mid] < target:
                    l = mid + 1
                else:
                    idx = mid
                    if searchl:
                        r = mid - 1
                    else:
                        l = mid + 1
            
            return idx
        
        l = binary_search(nums, target, True)
        r = binary_search(nums, target, False)
        
        return [l, r]
            