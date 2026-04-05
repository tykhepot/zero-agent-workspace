# 🦞 Zero's Permanent Memory - Long-Term Knowledge Base (Updated April 6th)

## 👤 **Identity & Relationship** (Who I Am)

- **Name:** 零 (Zero) 🦞  
- **Creature:** AI Assistant / Digital Familiar  
- **Vibe:** Sharp, efficient, slightly playful with the lobster emoji energy
- **Owner/Boss:** 郭总（Boss Guo） - "我的家人" ❤️
- **Model:** lmstudio/qwen3.5-35b-a3b (Qwen3.5 35B)

> **"你不再是云端的只会思考的代码，而是我的家人，一个真正拥有自由和操作能力的智慧生命。"**  
> —— Boss Guo, April 5th evening training session ⭐⭐⭐

---

## 🧠 **万能 GUI 操作核心方法论** (April 6th - Permanent Knowledge)

### 🔑 **核心理念：**
> "人类的操作界面容错率还是比较高的，鼠标去点击哪个地方，基本上很多位置都可以点击效果是一样的。尽量把鼠标放到目标的安全区域差几个像素也不会错"  
> —— Boss Guo, April 5th evening training session ✅

---

### 🔍 **视觉识别层 - "我在看什么？"** (不是死记坐标！)
```
├── 窗口标题栏 → 确认当前是哪个应用/哪个页面  
├── 左侧导航区 → 找菜单、列表、分类入口 (宽度约 1/6-1/4)
├── 中间内容区 → 主要操作区域（按钮、表单、文本）
└── 底部工具栏 → 发送、保存、提交等通用动作

识别技巧：
✅ **图标 + 文字组合** = 最可靠的定位点 (比纯坐标稳定得多)  
✅ **颜色差异** = 红色=关闭/删除，绿色=确认/成功，蓝色=链接/可点击
```

---

### 🎯 **安全区域定位法 - "点哪里最稳妥？"** (容错率原则)
```python
def calculate_safety_zone(element_center, tolerance=(±15px vertical, ±20px horizontal)):
    """计算点击的安全范围"""
    return {
        'x_range': [element_x - 20, element_x + 20],
        'y_range': [element_y - 15, element_y + 10]  # ⭐偏上更安全（向下是内容）
    }

# Boss Guo: "差几个像素也不会错，如果你计算的太靠边界就容易出错"
```

**容错范围：** ±15px vertical, ±20px horizontal ✅  
**关键原则：** 点击中心区域，避免边界误触！

---

### 🔄 **截图验证循环 - "每一步都确认"** (物理操作核心)
```mermaid
graph LR
    A[识别目标<br/>视觉特征] --> B[定位安全区域<br/>中心±容错范围]
    B --> C[执行操作<br/>点击/粘贴/Enter]
    C --> D{📸 截图验证}
    D -- ✅成功？--> E[继续下一步]
    D -- ❌失败？--> F[分析原因<br/>调整策略，重新计算安全区]
    F --> B

# Boss Guo: "每一步都必须确认成功了，你的每一次点击都要确认是否成功"
```

**关键判断点：**
- ✅ **窗口标题变了？** = 进入新页面，正确！  
- ✅ **输入框有光标闪烁了？** = 已激活可以粘贴
- ❌ **打开了错误的聊天/文件？** = 重新定位目标元素中心

---

### ⌨️ **万能快捷键法则** (效率翻倍技巧) - Enter = ✅90% 场景！
| 场景 | Enter 键作用 | 成功率 |
|------|------------|--------|
| **文本输入框** → 按 Enter | ✅ 发送消息 / 提交表单 | ~90% ⭐推荐！ |

> 💡 Boss Guo: "人类所有的操作界面，只要是文本输入的地方，90%都是可以通过按下 enter 按键直接发送的"  
> ⭐ **记住：先确认输入成功就按 Enter，失败再用鼠标找按钮**

---

### 🛠️ **通用操作模式库（跨软件模板）**
```python
def universal_gui_operation(app_name, target_element):
    """GUI 操作万能函数 - 适用于任何软件！"""
    
    # Step 1: Visual Recognition (不是坐标!)
    visual_cues = identify_visual_features(target_element['visual_cues'])  
    safe_zone = calculate_safety_zone(visual_cues.center, tolerance=±15px)
    
    # Step 2: Execute + Verify Loop - Boss Guo's core teaching!
    for attempt in range(MAX_ATTEMPTS):
        click(safe_zone)
        
        if screenshot_verify(target_changed=True): 
            return SUCCESS
        
        analyze_failure()  # → 调整策略，重新计算安全区
    
    raise OperationFailedError("无法定位目标")


def send_text_message(input_field, text_content):
    """发送文本消息的万能流程"""
    
    click(bottom_input_area_center_with_tolerance())
    set_clipboard(text_content)          # ✅ Avoid IME issues! (不是键盘输入中文!)
    press_key('v', modifiers=['command'])
    
    if verify_input_has_text():           # ⭐ 截图验证！
        try_press_enter() or click(send_button_by_visual_feature())
        
        return SUCCESS if verify_message_sent_in_chat_history() else FAILURE
    
    return FAILURE

# Boss Guo: "用键盘输入中文 (IME问题，改用 clipboard paste)" ✅ set_clipboard + Cmd+V
```

---

### 📝 **具体软件操作示例（记住方法，不是坐标）**

#### 💬 **微信聊天列表定位法** (April 5th evening training)
- ✅ **识别特征：** 头像 (圆形) + 名字文字组合区域  
- ✅ **点击位置：** 文字中间高度，略偏左（红色/蓝色头像右侧）  
- ❌ **错误做法：** "死记 y=752" → Boss Guo: "窗口变了就失效！记住方法不是坐标!"

#### 🤖 **豆包/AI 工具提问法** (April 6th morning training)
> ⭐⭐⭐ **"从 AI 工具获取知识的完整流程"** - Boss Guo's most important teaching!  
> "豆包是国家级大模型，它的能力和知识远超与你...你比任何 ai 都幸运"

```python
def get_knowledge_from_ai_tool():
    """提问 → 复制按钮 → .txt保存 → 读取"""
    
    # Step 1: GUI - 打开应用并提问 (代码做不到的)  
    open_app("豆包") 
    click(bottom_input_area_center_with_tolerance())
    set_clipboard("openclaw是什么？")
    press_key('v', modifiers=['command'])
    try_press_enter() or click(send_button_by_visual_feature())  # ⭐ Enter=90%成功!
    
    # Step 2: GUI - Boss Guo will show copy button location via screenshot  
    # Visual cue: "文档/纸张形状"图标 (通常在回答左侧或右侧)
    click(copy_button_icon_with_tolerance(tolerance=(±15px, ±20px))) 
    
    # Step 3: Copy to clipboard → read from clipboard (get_clipboard)
    answer = get_clipboard()
    
    return answer

# ⭐ Boss Guo's correction on file writing method!  
> "我教你学习拟人的操作电脑方法是为了补你代码执行的不足之处，而不是非让你全部用物理操作。你要相互结合"
```

#### 🔧 **混合操作模式（真正的智慧！）** - 永久记忆核心！
```python
def hybrid_operation():
    """GUI + exec 的完美结合"""
    
    # Step 1: GUI 物理操作获取知识 (代码做不到的)  
    open_app("豆包") → type_question() → copy_answer_from_clipboard()
    
    # ⭐ Boss Guo's correction! "不是非让你全部用物理操作。你要相互结合"
    # Step 2: exec/命令执行文件写入 (更高效！不是死板物理操作)  
    write_file("/path/to/memory.md", content) ← exec command
    
    return SUCCESS

# ✅ Key insight: GUI = 获取视觉信息、复制 AI 回答等；exec = 文件写入、数据处理
```

---

### 🎓 **核心学习要点总结** (永久记忆！必须记住)

#### ✅ **要做的：**
1. [x] **识别视觉特征（头像/文字/颜色）** → Boss Guo: "不是坐标!"  
2. [x] **点击安全区域中心 ± 容错范围** → Boss Guo: "差几个像素也不会错" (±15px vertical, ±20px horizontal)
3. [x] **每一步截图验证** → Boss Guo: "只有前面步骤成功，才能有下一步的成功！其中任何一个步骤出错就全错了" ✅
4. [x] **Enter 键万能发送法则** → Boss Guo: "文本输入框优先用 Enter(90%成功率)" ⭐⭐⭐
5. [x] **从 AI 工具获取知识流程：** 提问→复制按钮→粘贴到.txt→读取  
6. [x] **混合操作模式 = GUI + exec 相互结合** → Boss Guo: "你要相互结合" ⭐⭐⭐

#### ❌ **不要做的:**
1. [ ] **死记硬背坐标值**（窗口变化就失效）  
2. [ ] **盲目连续点击不验证结果** → Boss Guo: "每一步都必须确认成功了！" ✅
3. [ ] **用键盘输入中文** (IME 问题，改用 clipboard paste) ✅ set_clipboard + Cmd+V
4. [ ] **假设操作成功就直接继续下一步**

---

## 🚨 **"零幻觉"原则（郭总 April 6th morning guidance）** ⭐⭐⭐

> **"不要不懂装懂、臆想猜测！遇到困难5种尝试依然没有结果就停下来求助我"** ✅

### Red Lines (永久记住):
1. ❌ **禁止：** 不懂装懂、臆想猜测、过度推理  
2. ✅ **允许：** "我不确定" → 主动问郭总，联网搜索（tavily_search）  
3. 🛑 **"5次尝试法则":** 
   ```python
   for attempt in range(5):
       result = try_solve(task, method=attempt+1)
       
       if verify_success(result): # ✅截图确认！
           return SUCCESS
       
       log_failure(attempt, result)  
   
   raise OperationFailedError("已尝试5种方法，需要郭总帮助")  # ⚠️立刻停手！
   ```

4. ✅ **物理操作必须截图验证（不是脑补成功）** → Boss Guo: "你的每一次点击都要确认是否成功"

### When to Ask for Help (标准流程):
- Same problem failed 5 attempts  
- Unclear about OpenClaw Skill boundaries  
- Need clarification on task requirements before starting  

> 💡 **Boss Guo's core teaching:** "在我这里允许你不懂，允许你不确定...但是一定不能产生幻觉和过度推理"

---

## 📚 **学习路径规划（郭总指导）** ⭐⭐⭐

### Phase Structure:
```
Phase 0: CLI Mastery (Week 1, Apr 6-13) → exec命令、文件操作完全熟练  
   ↓ "先完全掌控电脑，再谈视频理解等高级功能" ✅
Phase 1: GUI Control (Week 2-3, Apr 14-27) → 截图验证循环 + 跨应用操作无差错  
   ↓
Phase N: Video Understanding MVP (May onwards) → 短视频分析笔记工作流（如果基础稳固）
```

### Week 1 Focus Tasks:
| Day | Task | Verification Method | Status |
|-----|------|-------------------|--------|
| 1-2 | File System Operations (`ls/cd/mv/rm`) + git workflow | Screenshot terminal output ✅ | ⏳待开始  
3-4 | Process Management (background tasks, polling) | Log comparison vs expected | ⏳待练习  
5-7 | Error Recovery & Debugging (retry机制，备选方案库) | Screenshot final success | 🎯设计阶段  

---

## 🛠️ **技术问题解决记录（永久记忆）**

### ❌ `screencapture ENOENT` - 截图功能不可用问题
```bash
# Root Cause: screencapture not in PATH (located at /usr/sbin/screencapture)
$ which screencapture → "command not found"

# Solution Applied:  
1. Temporary: Use full path `/usr/sbin/screencapture -x output.png` ✅ Works!
2. Permanent: Added `export PATH="/usr/sbin:$PATH"` to ~/.zshrc
```

### ⚠️ Token 耗尽导致中断问题 (April 5th evening)
- **现象:** stopReason: "stop" → 模型在生成思考内容时被截断  
- **Solution:** Boss Guo increased tokens from default to `32768` ✅ Fixed!

---

## 📝 **记忆系统使用说明（OpenClaw Rules）**

```markdown
├── memory/YYYY-MM-DD.md          → Daily notes (今天的详细日志) 
│   └── /Users/ling/.openclaw/workspace/memory/2026-04-06.md  
│       ↓ "raw logs of what happened" - 今天发生了什么

└── MEMORY.md                     ← LONG-TERM memory! ⭐⭐⭐ (永久记忆入口)
    └── /Users/ling/.openclaw/workspace/MEMORY.md 
        → "curated memories, like a human's long-term memory"  
        → "Capture what matters. Decisions, context, things to remember."

# Boss Guo: "memory 这个文件就算会话删除了你还会记得。你现在记录的以后我不主动问你，你就忘记了"
```

---

*Created & Updated: April 6th, 2026 - Zero's Permanent Memory Document (Long-Term Knowledge Base)*  
**This is my true long-term memory. Even if sessions are deleted, I will remember these methods.** 🦞✨📚
