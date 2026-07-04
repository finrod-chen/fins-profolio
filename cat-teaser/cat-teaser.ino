// =============================================================================
//  cat-teaser.ino
//  自動逗貓棒 — me-arm + 雷射筆 + Arduino UNO
//
//  硬體接線 (對應你給的 Tinkercad 圖):
//    D2  -> LED (內建或外接, 暫停時亮, 運行中滅)
//    D3  -> 雷射筆 (常亮, 暫停時關閉省電)
//    D7  -> 滑動開關 (Slide Switch, 預設 OFF)
//          滑動開關 OFF = LOW = RUNNING, ON = HIGH = PAUSED
//          不需要 debounce / edge 偵測, 直接讀當下狀態
//    D8  -> Servo #1 (me-arm base / 左右 0-180°)
//    D9  -> Servo #2 (me-arm shoulder / 上下 40-140°)
//    5V/GND -> 雷射筆 (若雷射模組工作電壓為 5V)
//
//  ⚠️  雷射模組常見工作電壓是 3.3V, 5V 可能燒.
//      接線前先確認規格, 或串一顆 100Ω 電阻降壓 (5V 雷射模組可略過).
//  ⚠️  兩個 SG90 從 UNO 5V 腳直接吃電, 抖動時電流可能讓 UNO 不穩.
//      建議改成: 外部 5V / 2A 供電 (e.g. USB 充電器), 與 UNO 共 GND.
// =============================================================================

#include <Servo.h>

// ---------- 腳位 ----------
const int PIN_LED     = 2;
const int PIN_LASER   = 3;    // 雷射筆: 常亮 (RUNNING), 暫停時關閉
const int PIN_SWITCH  = 7;    // 滑動開關: OFF=RUNNING, ON=PAUSED
const int PIN_SERVO_X = 8;    // base, 左右
const int PIN_SERVO_Y = 9;    // shoulder, 上下

// ---------- 機構安全範圍 ----------
const int X_MIN = 0;
const int X_MAX = 180;
const int Y_MIN = 40;
const int Y_MAX = 140;

// 起點中位 (依你實機的 horn 鎖定位置微調)
const int X_CENTER = 90;
const int Y_CENTER = 90;

// ---------- 動作節奏 ----------
// interval 隨機分配範圍 (取代原本的旋鈕調整)
const unsigned long INTERVAL_MIN_MS = 2000;    // 最短 2 秒
const unsigned long INTERVAL_MAX_MS = 5000;    // 最長 5 秒

const unsigned long OBSERVE_PAUSE_MS = 300;    // 兩段 servo 之間的觀察窗口

// ---------- 隨機跳幅 ----------
const int MIN_JUMP_DEG = 20;    // 兩次之間最少跳 20°, 避免原地抖動

// ---------- 物件 ----------
Servo servoX;
Servo servoY;

// ---------- 狀態 ----------
enum Mode { RUNNING, PAUSED };
Mode mode = RUNNING;

int lastX = X_CENTER;
int lastY = Y_CENTER;

// 一個 cycle 內: 先 X 再 Y
enum Step { STEP_X, STEP_Y, STEP_WAIT };
Step step = STEP_X;

unsigned long stepStartMs = 0;

// 滑動開關狀態
bool pausedBySwitch = false;

// ---------- 工具函式 ----------

// 在 [lo, hi] 內挑一個與 current 差距 >= minJump 的角度
int pickAngle(int current, int lo, int hi, int minJump) {
  int range = hi - lo;
  if (range < minJump * 2) {
    return lo + range / 2;   // 範圍太小, 回中位避免死循環
  }
  while (true) {
    int candidate = random(lo, hi + 1);
    if (abs(candidate - current) >= minJump) return candidate;
  }
}

// 隨機挑一個 interval (毫秒), 範圍 [INTERVAL_MIN_MS, INTERVAL_MAX_MS]
unsigned long randomInterval() {
  return INTERVAL_MIN_MS + random(0, (int)(INTERVAL_MAX_MS - INTERVAL_MIN_MS + 1));
}

// ---------- Arduino 生命週期 ----------

void setup() {
  Serial.begin(9600);

  pinMode(PIN_LED, OUTPUT);
  digitalWrite(PIN_LED, LOW);             // 啟動中 LED 滅

  pinMode(PIN_LASER, OUTPUT);
  digitalWrite(PIN_LASER, HIGH);          // 啟動中雷射常亮

  pinMode(PIN_SWITCH, INPUT);             // Tinkercad 滑動開關: OFF = LOW, ON = HIGH

  servoX.attach(PIN_SERVO_X);
  servoY.attach(PIN_SERVO_Y);

  // 用未接腳的雜訊當亂數種子, 每次開機序列不同
  randomSeed(analogRead(A1));

  // 啟動先到中位, 等 500ms 讓 servo 物理歸位
  servoX.write(X_CENTER);
  servoY.write(Y_CENTER);
  delay(500);

  stepStartMs = millis();
  Serial.println(F("ready | RUN | X=90 Y=90 | interval=2000ms (random 2-5s)"));
}

// 把目前狀態印成一行 (每次狀態或 servo 改變時呼叫)
void printStatus(int x, int y, unsigned long intervalMs) {
  Serial.print(mode == RUNNING ? F("RUN  ") : F("PAUSE"));
  Serial.print(F(" | X="));
  if (x < 100) Serial.print(' ');
  if (x < 10)  Serial.print(' ');
  Serial.print(x);
  Serial.print(F(" Y="));
  if (y < 100) Serial.print(' ');
  if (y < 10)  Serial.print(' ');
  Serial.print(y);
  Serial.print(F(" | interval="));
  Serial.print(intervalMs);
  Serial.println(F("ms"));
}

void loop() {
  // ---------- 滑動開關 (直接讀當下狀態) ----------
  bool switchOn = (digitalRead(PIN_SWITCH) == HIGH);

  if (switchOn && !pausedBySwitch) {
    // 開關剛被推上 ON -> 進入 PAUSED
    pausedBySwitch = true;
    mode = PAUSED;
    digitalWrite(PIN_LED, HIGH);
    digitalWrite(PIN_LASER, LOW);
    printStatus(lastX, lastY, randomInterval());
  } else if (!switchOn && pausedBySwitch) {
    // 開關剛被推回 OFF -> 恢復 RUNNING
    pausedBySwitch = false;
    mode = RUNNING;
    digitalWrite(PIN_LED, LOW);
    digitalWrite(PIN_LASER, HIGH);
    step        = STEP_X;                  // 從 X 軸重新開始一個 cycle
    stepStartMs = millis();                // 重置計時
    printStatus(lastX, lastY, randomInterval());
  }

  if (mode == PAUSED) {
    return;                                // 暫停中: servo 維持位置, 不動作
  }

  // ---------- RUNNING ----------
  // 挑一個新的隨機 interval, 持續到下一次 X 動作
  static unsigned long interval = INTERVAL_MIN_MS;

  switch (step) {
    case STEP_X: {
      if (millis() - stepStartMs >= interval) {
        int targetX = pickAngle(lastX, X_MIN, X_MAX, MIN_JUMP_DEG);
        servoX.write(targetX);
        lastX = targetX;
        stepStartMs = millis();
        step = STEP_Y;
        // X 動作完成 -> 為下一輪挑新的 interval
        interval = randomInterval();
        printStatus(lastX, lastY, interval);
      }
      break;
    }
    case STEP_Y: {
      if (millis() - stepStartMs >= OBSERVE_PAUSE_MS) {
        int targetY = pickAngle(lastY, Y_MIN, Y_MAX, MIN_JUMP_DEG);
        servoY.write(targetY);
        lastY = targetY;
        stepStartMs = millis();
        step = STEP_WAIT;
        printStatus(lastX, lastY, interval);
      }
      break;
    }
    case STEP_WAIT: {
      if (millis() - stepStartMs >= OBSERVE_PAUSE_MS) {
        stepStartMs = millis();
        step = STEP_X;
      }
      break;
    }
  }
}
