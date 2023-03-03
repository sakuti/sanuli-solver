# press letter on keyboard which are inputted while running the program

import keyboard
import time
import sys

if __name__ == "__main__":
	# clear previous input by pressing backspace 5 times if it possibly exists
	for i in range(5):
		keyboard.press_and_release('backspace')

	# input the string
	for i in range(len(sys.argv[1])):
		keyboard.press_and_release(sys.argv[1][i])

	# press enter
	keyboard.press_and_release('enter')

	# press enter to verify next step
	keyboard.press_and_release('enter')
	
	# press esc to get next word
	keyboard.press_and_release('esc')