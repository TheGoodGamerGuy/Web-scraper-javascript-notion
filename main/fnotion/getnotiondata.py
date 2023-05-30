import requests
from requests.structures import CaseInsensitiveDict
from time import time
import zipfile
import os
import sys

EnqueueTask = "https://www.notion.so/api/v3/enqueueTask"
GetTasks = "https://www.notion.so/api/v3/getTasks"

headers = CaseInsensitiveDict()
headers["cookie"] = 'token_v2=v02:user_token_or_cookies:fqXUfuOX7a3URQN37ZoPr_YCePqT5t-gUMjaEgm-OiZXQr7GN3GYYRMDLBtA79wif83SOdlnBKT4UUumQOwTIDmp4mJw0k6SqGZymtfosS2hcfsE_JytTQmFHRp-c6fyCfFk; file_token=1:QqeOiNhe4oBrE2p3If_inWVhyKGG9XKyApDtmgR60ZY:92769f9d9f93795efce528955262a83b484329f2e4fee49c:60168fa5-67b9-4a0d-8e9c-eefb1d1baef6'
headers["Content-Type"] = "application/json"

type = str(sys.argv[1])

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, f"headers/{type}.json")

with open(file_path, "r") as f:
    GetTaskId = f.read()


if os.path.exists("data.csv"):
    os.remove("data.csv")


TaskId = requests.post(EnqueueTask, headers=headers, data=GetTaskId)
TaskId = TaskId.json()

TaskIds = str({"taskIds": [TaskId["taskId"]]}).replace("'",'"')

done = False
TimeStart = time()

while not done:
    try:
        GetExportUrl = requests.post(GetTasks, headers=headers, data=TaskIds)
        GetExportUrl = GetExportUrl.json()

        ExportUrl = GetExportUrl['results'][0]['status']['exportURL']


        GetZip = requests.get(ExportUrl, headers=headers)

        with open(os.path.join(script_dir, "data.zip"), "wb") as f:
            f.write(GetZip.content)

        with zipfile.ZipFile(os.path.join(script_dir, "data.zip"),"r") as zip:
            zipinfo = zip.infolist()
            zipinfo[0].filename = "data.csv"
            # zip.extract(zipinfo[0], path=script_dir)
            zip.extract(zipinfo[0])

        if os.path.exists(os.path.join(script_dir, "data.zip")):
            os.remove(os.path.join(script_dir, "data.zip"))
        
        done = True
        # print("done")
    except:
        TimeNow = time()
        TimePassed = TimeNow - TimeStart
        if TimePassed > 10:
            print("error")
        else:
            continue



# if type == 'links':
#     with open('data.csv', "r") as file:
#         reader = csv.reader(file)
#         next(reader)
#         values = []
#         for row in reader:
#             if row:
#                 value = row[0]
#                 values.append(value)

#     print(values)
# elif type == 'keywords':
#     with open('data.csv', "r") as file:
#         reader = csv.reader(file)
#         next(reader)
#         values = []
#         for row in reader:
#             if row:
#                 keyword = row[1]
#                 price = row[3]
#                 values.append([keyword, price])

#     print(values)