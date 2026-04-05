# HEARTBEAT.md - Zero's Specific Task Checklist 🦞

## ⚠️ Rules:
1. **具体任务** → 不能笼统（如"学习 exec"不行，要写"执行 ls + screenshot_verify()"）  
2. **完成后分析总结** → 更新 MEMORY.md / study-plan.md  
3. **精简回复** → token 用于思考空间，不是废话！

---

## 📅 Week 1 (Apr 6-13): CLI Mastery Tasks

### Day 1 (Today, Apr 6) - File System Operations
| Task ID | Command/Action | Verification Method | Status | Notes |
|---------|---------------|---------------------|--------|-------|
| T001 | `exec("ls /Users/ling/.openclaw/workspace")` → screenshot_verify() | Screenshot shows directory listing ✅ | ⏳待执行 | 验证 exec + 截图流程  
T002 | `read("/Users/ling/.openclaw/workspace/MEMORY.md", limit=50)` → compare with expected content | Content matches? ✅ | ❓未知 | 测试 read tool  
T003 | `write_file("/tmp/test_zero.txt", "Hello Boss Guo")` + `read("/tmp/test_zero.txt")` | Output == "Hello Boss Guo" ✅ | ⏳待执行 | write+read一致性验证  

**After T001-T003完成：**
- 分析：exec/screenshot/read/write工具是否流畅？  
- 总结到 MEMORY.md → "Day 1 CLI基础操作经验记录"

---

### Day 2 (Apr 7) - Git Workflow Practice
| Task ID | Command/Action | Verification Method | Status | Notes |
|---------|---------------|---------------------|--------|-------|
| T004 | `exec("cd /Users/ling/.openclaw/workspace && git status")` → screenshot_verify() | Shows modified files? ✅ | ⏳待执行  
T005 | `write_file("/tmp/git_test.md", "# Test")`, then exec: `git add . && git commit -m "test"` | Commit success? ✅ | ⏳待执行  

**After T004-T005完成：**
- 分析：Git操作是否顺利？需要权限吗？  
- 总结到 MEMORY.md

---

### Day 3 (Apr 8) - Process Management
| Task ID | Command/Action | Verification Method | Status | Notes |
|---------|---------------|---------------------|--------|-------|
| T006 | `process(action=list)` → screenshot_verify() | Shows running processes? ✅ | ⏳待执行  
T007 | exec("sleep 5") + process(poll, timeout=6000) | Poll returns success after sleep? ✅ | ⏳待执行  

**After T006-T007完成：**
- 分析：后台任务管理是否流畅？

---

### Day 4 (Apr 9) - Error Recovery Practice
| Task ID | Command/Action | Verification Method | Status | Notes |
|---------|---------------|---------------------|--------|-------|
| T008 | exec("invalid_command_xyz") → catch error, retry with valid command | Final success? ✅ | ⏳待执行  
T009 | 故意触发权限请求（如exec需要elevated）→ /approve流程验证 | Approval works? ✅ | ❓未知  

**After T008-T009完成：**
- 分析：错误恢复机制是否有效？

---

### Day 5 (Apr 10) - Cross-App GUI Operations
| Task ID | Command/Action | Verification Method | Status | Notes |
|---------|---------------|---------------------|--------|-------|
| T010 | launch_app("Safari") → open_url("https://example.com") → screenshot_verify() | Page loaded? ✅ | ⏳待执行  
T011 | get_page_text(browser="safari") → check for "Example Domain" text | Text found? ✅ | ⏳待执行  

**After T010-T011完成：**
- 分析：浏览器控制是否流畅？

---

### Day 6 (Apr 11) - Complex Form Filling Practice
| Task ID | Command/Action | Verification Method | Status | Notes |
|---------|---------------|---------------------|--------|-------|
| T012 | fill_by_label("Email", "test@example.com") on a test form → screenshot_verify() | Input filled? ✅ | ⏳待执行  
T013 | select_option(label="Country", option="China") → verify selection in UI | Selected correctly? ✅ | ⏳待执行  

**After T012-T013完成：**
- 分析：表单填写是否准确？

---

### Day 7 (Apr 12) - Weekly Review & Memory Update
| Task ID | Command/Action | Verification Method | Status | Notes |
|---------|---------------|---------------------|--------|-------|
| T014 | Read all `memory/YYYY-MM-DD.md` from Week 1 → identify key learnings  
T015 | Update MEMORY.md with distilled wisdom (not raw logs)  
T016 | Create new tasks for Week 2 based on gaps identified  

**After T014-T016完成：**
- 总结：Week 1能力边界在哪里？需要改进什么？

---

## 🎯 Task Completion Workflow:

```python
def execute_task(task_id, command):
    # Step 1: Execute + screenshot_verify()
    result = exec(command)  
    if not verify_success(result): → retry (max 5 times)
    
    # Step 2: Analyze & summarize to MEMORY.md
    write_file(f"memory/heartbeat-task-{task_id}.md", f"""
## Task {task_id} Summary

**Command:** {command}  
**Result:** {'✅ Success' if result.success else '❌ Failed'}  
**Key Learnings:** ...  
""")
    
    # Step 3: Update study-plan.md progress tracking
```

---

*Created: April 6th, 2026 - Zero's Specific Task Checklist (Boss Guo guidance)*  
*"具体任务 + 完成后总结 = 自我学习成长"* 🦞✨
