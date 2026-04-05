#!/usr/bin/env python3
"""
Stable mac-use wrapper - Avoids Read tool chunking issues

This script provides stable mouse control operations by avoiding 
chained commands that trigger OpenClaw's read tool chunking.
"""


def screenshot_and_check(app_name, window_id):
    """
    Take a screenshot and verify it was created successfully.
    
    Args:
        app_name (str): Application name to capture  
        window_id (int): Window ID
    
    Returns:
        dict: Result containing status and file info
    """
    import subprocess
    
    print(f"📸 Taking screenshot of {app_name}...")
    
    # Step 1: Run OCR screenshot command
    result = subprocess.run(
        ['python3', 
         '/Users/ling/.openclaw/workspace/skills/mac-use/scripts/mac_use.py',
         'screenshot', app_name, '--id', str(window_id)],
        capture_output=True, text=True, timeout=60  # OCR processing time ✅
    )
    
    if result.returncode != 0:  
        return {
            "status": "error", 
            "message": f"Screenshot failed: {result.stderr}"
        }
    
    print("✅ Screenshot completed!")
    
    # Step 2: Check file exists and get size (NO Read tool needed!)
    try:
        result = subprocess.run(
            ['ls', '-lh', '/tmp/mac_use.png'], 
            capture_output=True, text=True, timeout=5
        )
        
        if "No such" in result.stdout or "cannot access" in result.stderr:  
            return {
                "status": "error", 
                "message": f"Screenshot file not found!"
            }
            
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
    # Step 3: Check OCR elements JSON (if exists)  
    try:
        result = subprocess.run(
            ['wc', '-l', '/tmp/mac_use_elements.json'], 
            capture_output=True, text=True, timeout=5
        )
        
        lines_count = int(result.stdout.split()[0]) if result.returncode == 0 else 0
        
    except Exception as e:  
        lines_count = 0
    
    return {
        "status": "success",
        "app_name": app_name, 
        "window_id": window_id,
        "screenshot_file": "/tmp/mac_use.png",
        "ocr_elements_lines": lines_count
    }


def click_window(app_name, window_id, x_coord, y_coord):  
    """Click a specific coordinate on the given window."""
    
    import subprocess
    
    print(f"🖱️ Clicking ({x_coord}, {y_coord}) on {app_name}...")
    
    result = subprocess.run(
        ['python3', 
         '/Users/ling/.openclaw/workspace/skills/mac-use/scripts/mac_use.py',
         'click', '--app', app_name, '--id', str(window_id),
         str(x_coord), str(y_coord)],  # Space-separated coordinates ✅  
        capture_output=True, text=True, timeout=30
    )
    
    if result.returncode == 0: 
        print("✅ Click completed!")
        
    else:  
        print(f"⚠️ Click failed: {result.stderr}")
    
    return {"status": "success", "coordinates": (x_coord, y_coord)}


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Stable mac-use operations") 
    parser.add_argument("--action", required=True, choices=["screenshot", "click"])  
    parser.add_argument("--app", help="Application name")
    parser.add_argument("--id", type=int, help="Window ID")
    parser.add_argument("--x", type=int, default=0, help="X coordinate for click") 
    parser.add_argument("--y", type=int, default=0, help="Y coordinate for click") 
    
    args = parser.parse_args()
    
    if args.action == "screenshot":  
        result = screenshot_and_check(args.app, args.id)
        
    elif args.action == "click":  
        result = click_window(args.app, args.id, args.x, args.y)
    
    print(f"\nResult: {result}")
