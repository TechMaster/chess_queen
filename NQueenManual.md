Kịch bản chạy thuật toán NQueen

cell sẽ có các trạng thái:
1. bình thường trắng hoặc đen
2. flash biểu thị nó đang được thuật toán xét đến
3. đánh dấu hợp lệ trong lần chạy này
4. đánh dấu không hợp lệ trong lần chạy này
4. đánh dấu là phần tử của solution hiện thời, hợp lệ từ lần chạy trước
5. nếu tại một hàng, không thể tìm được ô nào hợp lệ hãy reset toàn bộ cell hợp lệ hàng trên (loại bỏ solution)

Trước khi chạy đến hàng nào, hãy xoá toàn bộ các đánh dấu, style
Khi thay đổi trạng thái hiện thị ô nào, hãy lưu ô đó vào mảng động, để lần chạy tiếp theo nhanh chóng reset trạng thái hiển 

1. Hàng 0, chọn tất cả các ô hợp đều hợp lệ

2. Hàng 1
 - Highlight cell (0, 0)
 - Quét đến cell nào thì flash cell quick
    - cell hợp lệ , đánh dấu cell hợp lệ style khác với Highlight 
    - cell nào không hợp lệ hãy chỉ ra bị conflict với cell hiện có nào bằng vẽ line. Vẽ xong delay và clear
    
 Kết thúc hàng 1, chỉ cần hiện những cell 
 
 
# Khi chuyển sang mode chạy Manual, nhiều đoạn lệnh sẽ phải viết lại
 
 ## Phá vòng lặp lồng nhau
```javascript
  function nestLoop() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        console.log(i, j)
      }
    }
  }
  
```
 
```javascript
  let i = 0, j = 0

  function step() {
    if (i < 10) {
      console.log(i, j)
    }
    if (j < 10) {
      j++
    } else {
      j = 0
      i++
    }
  }
``` 
 ## Hàm gọi trong vòng lặp
 
    