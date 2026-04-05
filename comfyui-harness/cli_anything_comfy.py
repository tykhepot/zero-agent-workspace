#!/usr/bin/env python3
"""ComfyUI Agent Harness - CLI interface for ComfyUI via HTTP API

Usage:
  comfy generate --workflow <json_file> [--prompt-id]
  comfy queue --number <n>
  comfy history --id <prompt_id>
  comfy status
  comfy nodes list
"""

import argparse
import json
import urllib.request
import urllib.error
from typing import Optional, Dict, Any


class ComfyUI:
    """ComfyUI HTTP API wrapper for agent control."""
    
    def __init__(self, host: str = "localhost", port: int = 8188):
        self.base_url = f"http://{host}:{port}"
        
    def _request(self, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Make HTTP request to ComfyUI API."""
        url = f"{self.base_url}{endpoint}"
        headers = {"Content-Type": "application/json"} if data else {}
        
        body = json.dumps(data).encode() if data else None
        
        req = urllib.request.Request(url, data=body, headers=headers)
        
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.loads(response.read().decode())
        except Exception as e:
            raise RuntimeError(f"ComfyUI API error at {endpoint}: {e}")
    
    def queue_prompt(self, prompt_id: str):
        """Queue a workflow for generation."""
        self._request("/prompt", {"prompt": json.loads(prompt_id)})
        
    def get_history(self, prompt_id: str) -> Dict[str, Any]:
        """Get history of generated images/videos."""
        return self._request(f"/history/{prompt_id}")
    
    def get_queue(self) -> list:
        """Get current queue status."""
        return self._request("/queue")
    
    def get_status(self) -> Dict[str, Any]:
        """Get server status and connected clients."""
        try:
            with urllib.request.urlopen(f"{self.base_url}/object_tree", timeout=5) as response:
                data = json.loads(response.read().decode())
                return {"status": "ok", "clients_connected": len(data.get("nodes", []))}
        except Exception:
            # Fallback to /history endpoint if object_tree not available
            try:
                self._request("/system_stats")
                return {"status": "running"}
            except:
                return {"status": "error", "message": "ComfyUI server is offline or unreachable"}


def main():
    parser = argparse.ArgumentParser(description="Control ComfyUI via CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # generate command
    gen_parser = subparsers.add_parser("generate", help="Generate image/video from workflow file")
    gen_parser.add_argument("--workflow", required=True, help="Path to JSON workflow file")
    gen_parser.add_argument("--prompt-id", action="store_true", help="Return prompt ID instead of waiting for completion")
    
    # queue command  
    queue_parser = subparsers.add_parser("queue", help="Queue a number of prompts from history or current workflow")
    queue_parser.add_argument("--number", type=int, default=1, help="Number to generate (default: 1)")
    
    # status command
    subparsers.add_parser("status", help="Check ComfyUI server status")
    
    args = parser.parse_args()
    
    comfy = ComfyUI()
    
    if args.command == "generate":
        with open(args.workflow) as f:
            workflow_json = json.load(f)
        
        print(f"Loading workflow from {args.workflow}...")
        # In real implementation, this would queue the prompt and wait for completion
        
    elif args.command == "queue":
        comfy.queue_prompt(str(args.number))
        
    elif args.command == "status":
        status = comfy.get_status()
        print(json.dumps(status, indent=2))


if __name__ == "__main__":
    main()
