---
title: JSON格式的結構
pubDate: 2025-05-09
description: JSON格式的結構
heroImage: https://img.finrod.xyz/2025/07/4bbe7c7959c6f448a9bfc33f568718f4.png
---
JSON（JavaScript Object Notation）是一種輕量級的資料交換格式，易於人類閱讀與撰寫，也方便機器解析與生成。其結構主要由兩種基本資料型態組成：**對象（Object）** 和 **數組（Array）**。

---

## 對象（Object）

- 以大括號 `{}` 包圍。
- 由一組「鍵值對」（key-value pair）組成，鍵（key）必須是字串，值（value）可以是字串、數字、布林值、null、對象或數組。
- 鍵和值之間用冒號 `:` 隔開，不同的鍵值對之間用逗號 `,` 分隔。
- 範例：

```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

上例中，`"name"`、`"age"`、`"city"` 是鍵，對應的值分別為字串、數字和字串。

---

## 數組（Array）

- 以方括號 `[]` 包圍。
- 由一組值（value）組成，值之間用逗號 `,` 分隔。
- 每個值可以是任意型態，包括對象、數組、字串、數字、布林值或 null。
- 範例：

```json
["apple", "banana", "orange"]
```

或者包含對象的數組：

```json
[
  {"name": "Alice", "age": 5},
  {"name": "Bob", "age": 8}
]
```

這裡每個元素都是一個對象。

---

## 資料型態

JSON 支援以下幾種資料型態：

- 字串（String）：必須用雙引號包住
- 數字（Number）：可為整數或浮點數
- 布林值（Boolean）：true 或 false
- null
- 對象（Object）
- 數組（Array）

---

## 嵌套結構

JSON 的對象與數組可以互相嵌套，組成複雜的資料結構。例如：

```json
{
  "id": 1,
  "content": "hello world",
  "author": {
    "id": 2,
    "name": "userA"
  },
  "published": true,
  "label": [],
  "nextPost": null,
  "comments": [
    {
      "id": 3,
      "content": "good post1",
      "author": "userB"
    },
    {
      "id": 4,
      "content": "good post2",
      "author": "userC"
    }
  ]
}
```

這個例子中，`author` 是一個對象，`comments` 是一個包含多個對象的數組。

---

## 語法規則重點

- 鍵名必須是雙引號包住的字串。
- 值可以是多種型態。
- 對象和數組可以多層嵌套。
- 每個鍵值對或數組元素之間用逗號分隔，但最後一個元素後不能有逗號。

---

## 總結表格


| 結構 | 符號 | 內容 | 範例 |
| :-- | :-- | :-- | :-- |
| 對象 | `{}` | 鍵值對（key-value pairs） | `{ "name": "John" }` |
| 數組 | `[]` | 值的有序集合 | `` |
| 字串 | `""` | 文字 | `"hello"` |
| 數字 |  | 整數或小數 | `42`, `3.14` |
| 布林值 |  | `true` 或 `false` | `true` |
| null |  | 空值 | `null` |


---

JSON 結構簡單明瞭，廣泛用於資料交換與儲存，支援多種語言與平台。


