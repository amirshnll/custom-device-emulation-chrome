from pathlib import Path
import shutil
r=Path(__file__).resolve().parent.parent
shutil.copyfile(r/'device.json',r/'plugin/device.json')
print('Extension fallback dataset synchronized.')
