import json
import subprocess

email = input('Qual seu email? ')
password = input('Qual sua senha? ')

data = { 'email': email, 'password': password }

with open('./json/account.json', 'w') as file:
    json.dump(data, file)

subprocess.run(["C:\\Program Files\\nodejs\\npm.cmd", "install"])
subprocess.run(["C:\\Program Files\\nodejs\\npx.cmd", "tsc"])
subprocess.run(["C:\\Program Files\\nodejs\\npm.cmd", "run", "start"])