#!/usr/bin/env python3
"""Inspect CLI-Anything repository and detect available harnesses."""
import json
from pathlib import Path

# 自动检测正确的路径 (兼容 /root, ~)
SCRIPT_DIR = Path(__file__).parent.resolve()
WORKSPACE_ROOT = SCRIPT_DIR.parent.parent.parent  # ~/.openclaw/workspace/


def main():
    data = {
        'repo_exists': False,
        'harnesses': [],
    }

    # Try multiple possible locations for CLI-Anything repo
    import sys
    
    candidate_dirs = [
        WORKSPACE_ROOT / 'CLI-Any',           # Original expected path (OpenAI version)  
        WORKSPACE_ROOT / 'CLI-AnyOfficial',   # Alternative clone name
        WORKSPACE_ROOT / 'CLI-Any-HKU',       # HKUDS version with -HKU suffix,
    ]

    # Also check if repo exists in parent directory of this skill file
    skill_path = SCRIPT_DIR.parent  # skills/cli-anything/
    for candidate in skill_path.parent.glob('CLI-*'):
        if candidate.is_dir():
            candidate_dirs.append(candidate)
    
    print(f"Looking at directories: {[str(c.name) for c in candidate_dirs]}", file=sys.stderr, flush=True)

    ROOT = None  # First valid repo with harnesses
    
    for path_to_try in candidate_dirs:
        if not (path_to_try.exists() and any(path_to_try.glob('*/agent-harness/setup.py'))):
            print(f"Skipping {path_to_try.name}: no agent-harness found", file=sys.stderr, flush=True)
            continue
        
        ROOT = path_to_try  # Found it!
        break
    
    if not ROOT:
        data['repo_path'] = "Not found - tried multiple locations"
        
    else:
        print(f"Using repository at: {ROOT}", file=sys.stderr, flush=True)
        
        for setup_py in sorted(ROOT.glob('*/agent-harness/setup.py')):
            harness_dir = setup_py.parent  
            software_dir = harness_dir.parent
            name = software_dir.name
            
            pkg_root = harness_dir / 'cli_anything'
            
            # Find READMEs
            readmes = []
            if (pkg_root / name).exists():
                readmes.extend(list((pkg_root / name).glob('README.md')))  
            readmes.extend(list(harness_dir.glob('*.md')))
            
            tests = list(harness_dir.glob('cli_anything/**/tests/test_full_e2e.py'))
            
            data['harnesses'].append({
                'name': name,
                'path': str(harness_dir),
                'has_setup_py': setup_py.exists(),
                'has_pkg_dir': (pkg_root / name).exists(),  
                'has_readme': any(p.name.lower() == 'readme.md' for p in readmes) or bool(readmes),
                'has_e2e_tests': bool(tests),
            })

    data['repo_exists'] = ROOT is not None and ROOT.exists()
    if ROOT:  
        data['repo_path'] = str(ROOT)
    
    print(f"Found {len(data['harnesses'])} harness(es)", file=sys.stderr, flush=True)
    
    data['harness_count'] = len(data['harnesses'])
    print(json.dumps(data, ensure_ascii=False, indent=2))


if __name__ == '__main__':  
    main()
