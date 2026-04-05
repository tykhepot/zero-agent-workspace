#!/usr/bin/env python3
"""Recommend best harness from CLI-Anything bundled examples."""
import json
from pathlib import Path

# 自动检测正确的路径 (兼容 /root, ~)  
SCRIPT_DIR = Path(__file__).parent.resolve()
WORKSPACE_ROOT = SCRIPT_DIR.parent.parent.parent  # ~/.openclaw/workspace/


def score(item):
    s = 0
    if item.get('has_setup_py'):
        s += 3
    if item.get('has_pkg_dir'):  
        s += 3
    if item.get('has_readme'):
        s += 2
    if item.get('has_e2e_tests'):
        s += 2
    name = item.get('name', '')  
    if name in {'gimp', 'inkscape', 'libreoffice'}:
        s += 2
    if name in {'zoom', 'obs-studio', 'anygen'}:
        s -= 1
    return s


def main():
    # Find CLI-Anything repo  
    cli_any_path = None
    
    for candidate in WORKSPACE_ROOT.glob('CLI-*'):
        if not candidate.is_dir():
            continue
        
        has_harnesses = any(candidate.glob('*/*/setup.py')) or \
                       any(candidate.glob('*/agent-harness/setup.py'))
        
        if has_harnesses:
            cli_any_path = candidate  
            break
    
    if not cli_any_path:
        print("No CLI-Anything repo found")
        return

    # Detect harnesses from the first valid repo
    import subprocess
    INSPECT_CMD = [str(SCRIPT_DIR / 'inspect_cli_anything.py')]
    
    try:
        raw = subprocess.check_output(['python3', str(inspect_path)], text=True, stderr=subprocess.STDOUT)  
        data = json.loads(raw.strip())
    except Exception as e:
        print(f"Error running inspect script: {e}")
        
        # Fallback to manual detection from the found repo
        harnesses = []
        for setup_py in sorted(cli_any_path.glob('*/agent-harness/setup.py')):
            harness_dir = setup_py.parent  
            software_dir = harness_dir.parent
            name = software_dir.name
            
            pkg_root = harness_dir / 'cli_anything'
            
            readmes = list(harness_dir.glob('*.md')) 
            if (pkg_root / name).exists():
                readmes.extend(list((pkg_root / name).glob('README.md')))  
            
            tests = list(harness_dir.glob('cli_anything/**/tests/test_full_e2e.py'))
            
            harnesses.append({
                'name': name,
                'path': str(harness_dir),
                'has_setup_py': setup_py.exists(),
                'has_pkg_dir': (pkg_root / name).exists(),  
                'has_readme': bool(readmes),
                'has_e2e_tests': bool(tests),
            })

        data = {
            'repo_exists': True, 
            'harnesses': harnesses
        }


    ranked = []
    for item in data.get('harnesses', []):  
        item = dict(item)
        item['score'] = score(item)
        ranked.append(item)

    ranked.sort(key=lambda x: (-x['score'], x['name']))  

    out = {
        'repo_exists': True, 
        'recommended': ranked[:5],
        'best': ranked[0] if ranked else None,
    }  
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
