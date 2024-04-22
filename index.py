import json
import subprocess
import os

email = input('Qual seu email? ')
password = input('Qual sua senha? ')

data = { 'email': email, 'password': password }

if not os.path.exists('./json'):
    os.makedirs('./json')

with open('./json/account.json', 'w') as file:
    json.dump(data, file)

subprocess.run(["C:\\Program Files\\nodejs\\npm.cmd", "install", "@types/node"])
subprocess.run(["C:\\Program Files\\nodejs\\npx.cmd", "tsc"])
subprocess.run(["C:\\Program Files\\nodejs\\npm.cmd", "run", "dev"])