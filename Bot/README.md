# innoviz-ctrl-alt-defeat
Repo for innoviz code

## Install Python Environment (Python>=3.9)
[Python Environment Installation Guide](https://confluence.intranet.db.com/pages/viewpage.action?spaceKey=IN&title=2.5.3+Onboarding+shortlisted+python+packages+in+DB)

## Google cloud setup on local machine
[Google Cloud Setup Guide](https://confluence.intranet.db.com/pages/viewpage.action?spaceKey=CCRYPTO&title=gCloud+installation+steps+and+useful+gCloud+commands)

## Add the newly created adc.json in the same directory. (It has Google access credentials)

## Proxies to set:
```
set https_proxy=http://userproxy.intranet.db.com:8080/
set http_proxy=http://userproxy.intranet.db.com:8080/
```

## Environment variables to set
```
api_key=""
project_name=""
bucket_name=""
```

## How to run on local?
```
git clone https://github.com/inkn-yx6t/innoviz-ctrl-alt-defeat
cd local
pip install -r requirements.txt
flask run --debug
```