class Solution:
    def addOne(self, head):
        d = Node(0)
        d.next = head
        last_not_nine = d
        curr = head
        while curr:
            if curr.data < 9:
                last_not_nine = curr
            curr = curr.next
        last_not_nine.data += 1
        curr = last_not_nine.next
        while curr:
            curr.data = 0
            curr = curr.next
        if d.data == 1:
            return d
        else:
            return d.next