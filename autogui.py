import pyautogui,time


text="vadaPav"

print(text)

for i in range(200):
    time.sleep(0.01)
    pyautogui.typewrite(text)
    time.sleep(0.1)
    pyautogui.press('enter')
