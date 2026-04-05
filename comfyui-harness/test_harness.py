#!/usr/bin/env python3
"""Test the ComfyUI harness - verify it can connect to server."""

import sys
sys.path.insert(0, '/Users/ling/.openclaw/workspace/comfyui-harness')

from cli_anything_comfy import ComfyUI


def test_connection():
    """Check if ComfyUI is running and accessible."""
    comfy = ComfyUI(host="localhost", port=8188)
    
    try:
        status = comfy.get_status()
        
        print("✅ ComfyUI Harness Test Results:")
        print("-" * 40)
        print(f"Status: {status}")
        
        if "error" in str(status).lower():
            print("\n⚠️  Warning: Cannot connect to ComfyUI server")
            print("   Please start it first:")
            print("   cd ~/comfyui_install && source .venv/bin/activate && python main.py --listen")
        else:
            print("\n✅ Harness is ready! You can now generate images/videos.")
            
    except Exception as e:
        print(f"❌ Error testing harness: {e}")


if __name__ == "__main__":
    test_connection()
