from pathlib import Path
import json, shutil
root=Path(__file__).resolve().parent.parent
data=json.loads((root/'device.json').read_text())
names=set()
for category,items in data.items():
    assert category in ('mobile','tablet','desktop')
    for d in items:
        assert d['device'] not in names, d['device']
        names.add(d['device'])
        assert all(isinstance(d[k],(int,float)) and d[k]>0 for k in ('width','height','dpr'))
        assert d['status'] in ('unverified','source-checked')
        if d['status']=='source-checked':
            assert d['source'].startswith('https://') and d['last_verified']
        else:
            assert d['last_verified'] is None
out=root/'dist';out.mkdir(exist_ok=True)
for name in ('index.html','site.css','site.js','device.json'):
    shutil.copyfile(root/name,out/name)
print(f'Validated {len(names)} devices; built static site in dist/')
