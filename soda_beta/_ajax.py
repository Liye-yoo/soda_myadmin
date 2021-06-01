import requests
from django.http import JsonResponse

# pip list > requests 설치 확인
# 전체 style의 카테고리 리스트를 내려준다.
def call_style_api(request):
    response = requests.get("http://soda-api.snow.me/v1/style/overview")
    return JsonResponse(response.json())

def call_filter_api(request):
    response = requests.get("http://soda-api.snow.me/v1/filter/overview")
    return JsonResponse(response.json())