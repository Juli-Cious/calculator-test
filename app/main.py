from main import display_result

def button_click(event):
    button = event.target
    if button.id == 'equals-btn':
        calculate_result()
    else:
        display_result(str(button.innerText))

def calculate_result():
    # TO DO: implement calculation logic here
    pass
