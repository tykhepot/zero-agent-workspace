# ComfyUI + Wan2.1 Agent Harness - SOP

## ✅ Setup Complete!

**Installed:**
- ✅ Wan2.1 T2V (Text-to-Video) model: `Wan2___2-T2V-A14B` (~6GB)  
- ✅ Wan2.1 I2V (Image-to-Video) model: `Wan2___2-I2V-A14B` (~5GB)
- ✅ ComfyUI custom nodes from Kijai's wrapper

**Location:** `/Users/ling/comfyui_install/models/video/Wan2_*`  
**Custom Nodes:** `/Users/ling/.comfyui_install/custom_nodes/ComfyUI-WanVideo`

---

## 🚀 How to Use (For Me)

### Step 1: Start ComfyUI Server
```bash
cd ~/comfyui_install && source .venv/bin/activate && python main.py --listen --port 8188
```

**Important:** Wan2.1 requires **GPU acceleration**. Your Mac Studio M3 has Neural Engine but not CUDA, so:
- Use CPU mode (slower) OR  
- Run on a machine with NVIDIA GPU + CUDA support

### Step 2: Generate Video via CLI Harness
I'll use this command to generate videos:

```bash
python /Users/ling/.openclaw/workspace/comfyui-harness/cli_anything_comfy.py \
  --workflow <wan_workflow.json> \
  --prompt-id
```

---

## 📋 Workflow Templates Available

1. **Text-to-Video (T2V)** - `wan_t2v_workflow.json`  
   Input: Text prompt → Output: Video clip
   
2. **Image-to-Video (I2V)** - Coming soon!  
   Input: Image + Motion description → Output: Animated video

---

## 🎬 Example Use Cases

**"Make a 5-second anime-style animation of waves crashing on shore"**
→ I'll build T2V workflow with Wan model, set appropriate steps/seed

**"Animate this photo to show the person smiling and waving"**  
→ I'll use I2V mode (need image input first)

---

## ⚠️ Performance Notes

- **Mac Studio M3**: CPU-only inference will be SLOW (~10-30 min per video)
- For faster generation, consider:
  - Running ComfyUI on a Windows/Linux machine with NVIDIA GPU  
  - Using cloud services (RunPod, Replicate, etc.) for Wan2.1

---

## 🦞 Next Steps

Ready to generate videos! Just tell me what you want and I'll build the workflow + execute it via CLI harness.
