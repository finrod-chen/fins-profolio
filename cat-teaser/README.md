# 自動逗貓棒 (Cat Teaser)

me-arm + 雷射筆 + Arduino UNO 做的自動逗貓玩具。隨機亂動製造雷射光點，讓貓追蹤捕捉。

## 檔案

- `cat-teaser.ino` — Arduino sketch (主程式, 187 行)
- 對應硬體接線圖：見下方「硬體接線」

## 功能

1. **啟動隨機模式**：LED 滅，每隔隨機 2-5 秒兩個 servo 各抽一個角度，雷射光點在牆上/地板上亂跑
2. **滑動開關暫停**：D7 滑動開關推 ON → 暫停（LED 亮、雷射關），推 OFF → 恢復
3. **Serial 監控**：印出每次狀態變化和 servo 角度，方便除錯

## 硬體接線

### Arduino UNO 接腳對照

| 腳位 | 元件 | 備註 |
|------|------|------|
| D2   | LED | 暫停時亮，運行中滅（純指示用） |
| D3   | 雷射筆 | 常亮（運行中），暫停時關閉省電 |
| D7   | 滑動開關 (Slide Switch) | OFF = RUNNING，ON = PAUSED |
| D8   | Servo X (base) | me-arm 左右，0-180° |
| D9   | Servo Y (shoulder) | me-arm 上下，40-140° |
| 5V   | 麵包板 + rail | 給 LED、雷射、邏輯電路供電 |
| GND  | 麵包板 − rail | 所有元件共同接地 |

### 供電

- **Arduino UNO**：USB 供電（也可 VIN 7-12V）
- **兩個 SG90 servo**：**外部 6V 電池盒**（AA 4 顆），與 UNO 共 GND
  - 不要從 UNO 5V 直接供電，servo 抖動電流會讓 UNO 不穩
- **雷射模組**：從 UNO 5V 取電（已透過 LED 限流）

### ⚠️ 雷射模組電壓注意

雷射模組常見工作電壓是 **3.3V**，接到 5V 可能燒。實體接線前先確認規格：
- 5V 雷射模組：直接接
- 3.3V 雷射模組：在 5V 與雷射 V+ 之間串一顆 **100Ω 電阻**降壓

## 設計決策

### 隨機策略
- **角度**：每次 X/Y 抽 0-180° / 40-140° 範圍內，**最少跳 20°** 避免原地抖動
- **時間**：cycle 間隔在 **2-5 秒內均勻隨機**，每個 cycle 重新抽
- **動作順序**：先動 X → 等 300ms 觀察窗口 → 再動 Y → 等 300ms → 下一個 cycle
  - 觀察窗口讓貓有時間「看到」上一個點再追下一個

### 滑動開關 vs 按鈕
- 用**滑動開關**而非按鈕：保持性、實體一眼能看出 ON/OFF、不需要 debounce
- Tinkercad 預設 OFF = LOW、ON = HIGH（與實體 INPUT_PULLUP 慣例相反）

### 隨機分配 vs 旋鈕
- 一開始有 10kΩ 旋鈕可調頻率，後來拿掉改成隨機
- 理由：旋鈕需要手動調整，隨機分配對貓「不可預測」效果更好

## 已知 Tinkercad 模擬器陷阱

以下只在 **Tinkercad 模擬器**有問題，實體 Arduino 不受影響：

1. **Servo 元件預設由 Arduino 供電** → 要改成 "External Power"，並補上電池盒
2. **GND 必須從電池盒接回 Arduino** → 否則所有 LED/Serial/旋鈕都失效（參考電位浮動）
3. **Pushbutton / Slide Switch 預設 LOW** → 不要用 `INPUT_PULLUP`（會被 Tinkercad 忽略）
4. **輸入浮動 = LOW**（不是 HIGH）→ 一啟動 D7 讀到 LOW 會被當作「已按下」

詳細記錄見 `~/.hermes/skills/arduino-cat-teaser-me-arm/SKILL.md`

## Tinkercad 模擬輸出範例

```
ready | RUN | X= 90 Y= 90 | interval=2000ms (random 2-5s)
RUN   | X= 51 Y= 90 | interval=2610ms
RUN   | X= 51 Y= 69 | interval=2610ms
RUN   | X= 22 Y= 69 | interval=2397ms
RUN   | X= 22 Y= 97 | interval=2397ms
RUN   | X= 64 Y= 97 | interval=3993ms
...
```

格式：`狀態 | X=角度 Y=角度 | interval=毫秒`

## 從 Tinkercad 燒到實體 UNO 的檢查清單

實體接線前先做：

- [ ] **Servo 機械臂中位確認**：手動供電給 servo，看 90° 時機械臂是否在「水平/俯仰適合雷射照地板」的位置。如果不是，改 `X_CENTER` / `Y_CENTER` 常數
- [ ] **機械極限確認**：手動轉到 X_MIN(0)、X_MAX(180)、Y_MIN(40)、Y_MAX(140)，確認機構不會卡死或燒 servo
- [ ] **雷射模組電壓**：確認是 5V 還是 3.3V，3.3V 要串 100Ω 電阻
- [ ] **外部電源**：Servo 改用 6V 電池盒或 5V/2A USB 充電器，與 UNO 共 GND
- [ ] **雷射固定**：固定在 servo 機械臂末端，確認不會擋住 servo 活動
- [ ] **滑動開關接線**：腳位 1 → D7、腳位 2 → GND（**注意實體要改回 `INPUT_PULLUP` + FALLING edge**）

⚠️ **實體 Arduino 上必須改回 `INPUT_PULLUP`**：Tinkercad 的按鈕/開關邏輯跟實體相反，實體的滑動開關接 GND + `INPUT_PULLUP` 才正確。

## 程式碼主要常數（要調整就看這幾行）

```cpp
const int X_MIN = 0;
const int X_MAX = 180;          // 左右範圍
const int Y_MIN = 40;
const int Y_MAX = 140;          // 上下範圍
const int X_CENTER = 90;        // 啟動中位 (實機 tune)
const int Y_CENTER = 90;

const unsigned long INTERVAL_MIN_MS = 2000;   // 最短間隔
const unsigned long INTERVAL_MAX_MS = 5000;   // 最長間隔
const unsigned long OBSERVE_PAUSE_MS = 300;   // X->Y 之間的觀察窗口

const int MIN_JUMP_DEG = 20;    // 最少跳幅
```

## 未來可考慮的改進

- [ ] Servo 加裝電位器回授，做**閉迴路角度控制**（精準度比開迴路高）
- [ ] 加 PIR 感測器，**貓靠近才啟動**，離開自動暫停
- [ ] 加藍牙/WiFi 模組，用手機 App 控制節奏
- [ ] 換 MG996R 金屬齒輪 servo，扭力更大、更耐操
- [ ] 雷射改成**可調亮度**，配合貓的活動時間（白天弱、晚上強）
