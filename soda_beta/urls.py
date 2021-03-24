from django.urls import path

from soda_beta import views

app_name = 'soda_beta'
urlpatterns = [

    path('qahelper', views.QAHelperView.as_view(), name='qa_helper'),
    ]