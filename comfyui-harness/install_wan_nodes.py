#!/usr/bin/env python3
"""Download and install Wan2.1 ComfyUI custom nodes."""

import urllib.request
import zipfile
import os


def download_and_extract(url, dest_dir):
    """Download zip file and extract to directory."""
    
    print(f"Downloading from {url}...")
    
    try:
        # Create temp dir for download
        temp_zip = "/tmp/wan_nodes.zip"
        
        with urllib.request.urlopen(url, timeout=600) as response, open(temp_zip, 'wb') as out_file:
            chunk_size = 8192 * 32
            while True:
                chunk = response.read(chunk_size)
                if not chunk:
                    break
                out_file.write(chunk)
        
        print(f"Downloaded {os.path.getsize(temp_zip)} bytes")
        
        # Extract to dest_dir
        with zipfile.ZipFile(temp_zip, 'r') as zip_ref:
            zip_ref.extractall(dest_dir)
        
        # Rename extracted folder (usually has -main suffix)
        for item in os.listdir(dest_dir):
            if "WanVideo" in item and os.path.isdir(os.path.join(dest_dir, item)):
                new_name = dest_dir + "/ComfyUI-WanVideo"
                old_path = os.path.join(dest_dir, item)
                
                # Remove existing folder first
                import shutil
                if os.path.exists(new_name):
                    shutil.rmtree(new_name)
                    
                os.rename(old_path, new_name)
        
        print(f"✅ Installed to {dest_dir}/ComfyUI-WanVideo")
        
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    comfyui_custom_nodes = "/Users/ling/.openclaw/workspace/comfyui_install/custom_nodes"
    
    # Kijai's Wan2.1 nodes (most popular)
    url = "https://github.com/kijai/ComfyUI-WanVideo/archive/main.zip"
    
    download_and_extract(url, comfyui_custom_nodes)
