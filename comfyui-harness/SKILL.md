# ComfyUI Agent Harness

Use this harness to control ComfyUI via CLI for generating images and videos. The harness wraps ComfyUI's HTTP API (default port 8188).

## Quick Start

**Prerequisites:**
- ComfyUI running locally: `cd ~/comfyui_install && source .venv/bin/activate && python main.py --listen`
- This harness installed in your workspace at `/Users/ling/.openclaw/workspace/comfyui-harness/`

## Commands

### Check Status
```bash
python /Users/ling/.openclaw/workspace/comfyui-harness/cli_anything_comfy.py status
```

### Generate from Workflow File
```bash
# Load a workflow JSON and generate (waits for completion)
python cli_anything_comfy.py generate --workflow path/to/workflow.json

# Or just queue it without waiting:
python cli_anything_comfy.py generate --workflow path/to/workflow.json --prompt-id
```

### Queue Multiple Prompts
```bash
python cli_anything_comfy.py queue --number 5
```

## Workflow Files

ComfyUI workflows are JSON files that define the node graph. You can:
1. Create them in ComfyUI UI and click "Save" 
2. Use preset templates from [comfyanonymous/ComfyUI_examples](https://github.com/comfyanonymous/ComfyUI_examples)
3. Let me help you build one!

## Example Workflow Structure

```json
{
  "3": {
    "inputs": {"seed": 12345, "steps": 20},
    "_class_name": "KSampler"
  }
}
```

I can generate complete workflows for you - just tell me what kind of image/video you want! 🦞

## Notes

- ComfyUI must be running before using this harness
- Default API endpoint: `http://localhost:8188`
- All generation happens locally on your Mac Studio M3 (256GB RAM) - very fast!
