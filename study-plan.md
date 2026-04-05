# Zero's CLI/GUI Mastery Learning Plan 🦞

> "先完全掌控电脑 → 再谈视频理解、摄像头等高级功能"  
> —— Boss Guo, April 6th morning guidance ✅

---

## 🎯 **核心目标**

| 阶段 | 时间范围 | 能力要求 |
|------|---------|----------|
| Phase 0: CLI Mastery | Week 1 (Apr 6-13) | `exec`命令、文件操作、git workflow完全熟练  
Phase 1: GUI Control | Week 2-3 (Apr 14-27) | 截图验证循环 + 跨应用操作无差错
Phase 2: Tool Integration | Week 4+ (May onwards) | OpenClaw Skill系统深度使用

---

## 📚 **Week 1: CLI Mastery** (April 6-13, 2026)

### ✅ Day 1-2: File System Operations
| Task | 验证方式 | Status |
|------|---------|--------|
| `exec`执行 shell命令（ls/cd/mv/rm） | 截图确认终端输出 | ⏳待开始  
| write_file/read_file/edit文件操作 | 读取内容对比原文件 | ✅已掌握  
| git workflow (status/add/commit/push) | GitHub PR/MR验证 | ⏳待练习  

### ✅ Day 3-4: Process Management
| Task | 验证方式 | Status |
|------|---------|--------|
| `process(action=list)`查看后台任务 | 截图确认进程列表 | ⏳待开始  
| process(action=poll, timeout=ms)等待结果 | 日志输出对比预期 | ✅已掌握  

### ✅ Day 5-7: Error Recovery & Debugging
| Task | 验证方式 | Status |
|------|---------|--------|
| exec超时/失败 → retry机制 + 备选方案 | 截图确认最终成功 | ⏳待设计  
| `exec`权限请求流程（allow-once vs allow-always） | /approve命令记录 | ✅已理解  

---

## 🎨 **Week 2-3: GUI Control** (April 14-27, 2026)

### ✅ Day 8-10: Cross-App Operations
| Task | 验证方式 | Status |
|------|---------|--------|
| Feishu文档编辑（create/update/delete_block） | 打开Feishu网页截图确认 | ⏳待开始  
| Discord/Telegram消息发送 + reactions | 聊天窗口截图对比 | ✅已掌握 (Weixin)  

### ✅ Day 11-14: Complex Form Filling
| Task | 验证方式 | Status |
|------|---------|--------|
| multi-step表单（每填一项截图确认） | 最终提交结果 vs 预期数据 | ⏳待设计  
| dynamic dropdown menus识别 + select_option | 下拉选项列表截图对比 | ✅已掌握 (browser工具)  

### ✅ Day 15-20: Window State Management
| Task | 验证方式 | Status |
|------|---------|--------|
| "窗口指纹"系统（标题栏+左侧导航区特征识别） | get_ui_elements输出 vs 截图对比 | ⏳待开发  
| multi-window切换 + focus确认 | screenshot() → OCR文字匹配 | ✅已掌握 (batch_actions)  

---

## 🛠️ **Week 4+: Tool Integration** (May onwards)

### ✅ Day 21-30: OpenClaw Skill Deep Dive
| Task | 验证方式 | Status |
|------|---------|--------|
| feishu_doc/feishu_drive/feishu_wiki完整工作流 | Feishu控制台截图确认 | ⏳待开始  
| tavily_search/tavily_extract对比 web_fetch/browser | 搜索结果一致性检查 | ✅已掌握  

---

## 🧠 **Memory Update Schedule** (Heartbeat期间)

```json
{
  "lastChecks": {
    "study_plan_review": null,
    "memory_update": null,
    "skill_practice": null
  }
}
```

- ✅ Daily: `memory/YYYY-MM-DD.md` → 今日学习记录  
- 🔄 Weekly (Sunday): Update `MEMORY.md` + study-plan.md进度追踪  

---

## ⚠️ **Red Lines（郭总强调，永久记住）**

1. ❌ 不懂装懂、臆想猜测
2. ✅ "我不确定"是 OK 的 → 主动问郭总  
3. 🛑 5次尝试失败 → 立刻停下来求助！  
4. ✅ 物理操作必须截图验证（不是脑补成功）

---

## 💬 **遇到困难时的标准流程**

```python
def handle_difficulty(task, attempts=0):
    # Step 1: 联网搜索 (tavily_search)
    if not self.knows_solution():  
        search_results = tavily_search(query=f"{task} solution")
    
    # Step 2: 尝试执行（最多5次）
    for attempt in range(5):
        result = try_execute(task, method=attempt + 1)
        
        if verify_success(result):  # ✅截图确认！
            return SUCCESS
        
        log_failure(attempt, result)  
        
    # Step 3: ⚠️ 第5次失败 → 停下来求助郭总
    raise OperationFailedError("已尝试5种方法，需要人工帮助")

# Boss Guo's rule: "不懂就去联网搜索，不会或者遇到困难告诉我" ✅
```

---

*Created: April 6th, 2026 - Zero's CLI/GUI Mastery Learning Plan  
Updated by: Zero 🦞 | Verified by: Boss Guo (郭总) ⭐⭐⭐*
