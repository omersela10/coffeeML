# GroundingDino First Step Guide

GroundingDino first step guide:
1. Open `coffeeML\GroundingDINO\test.ipynb` in vscode
2. Open a new terminal in vscode
3. Insert in the terminal `cd coffeeML\GroundingDINO`
4. Open a new venv: `python -m venv venv`.
   It will open venv environment in GroundingDINO folder.
5. Activate venv: `.\venv\Scripts\activate`
6. Pip install GroundingDINO all dependencies:
   `pip install -e .`
7. create folder called weights : `cd coffeeML\GroundingDINO` and `mkdir weights`
8. insert weghits folder: `cd weights`
9. Install weghits model: `wget -o coffeeML/GroundingDINO https://github.com/IDEA-Research/GroundingDINO/releases/download/v0.1.0-alpha/groundingdino_swint_ogc.pth `
10. Change vscode python interpreter (`ctrl+shift+p`) to be your venv:
   `C:\git\coffeeML\coffeeML\GroundingDINO\venv\Scripts\python.py `
11. Run `test.ipynb` file.
