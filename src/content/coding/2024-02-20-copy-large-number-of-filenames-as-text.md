---
title: 如何大量複製檔名文字
pubDate: 2024-02-20
description: 要大量複製資料夾內所有檔名，最快速的方法如下。
heroImage: https://img.finrod.xyz/2025/07/854f31aeacf5417d251fc0eb2b847e62.png
---

## 使用Windows指令

要大量複製資料夾內所有檔名，最快速的方法如下：

1. 打開記事本，輸入這段指令：

```
@echo off
dir /b /on >list.txt
```

2. 將檔案另存為「檔名.bat」（副檔名一定要是 .bat）。
3. 把這個 .bat 檔放到要複製檔名的資料夾裡。
4. 直接雙擊執行這個 .bat 檔，資料夾內會自動產生一個 list.txt 檔案，裡面就是所有檔案的檔名清單，複製貼上即可。

如果你常常需要這個功能，也可以考慮用像 FilelistCreator 這類工具，能匯出 Excel 檔並自訂欄位。