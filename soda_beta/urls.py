from django.urls import path

from soda_beta import views

app_name = 'soda_beta'
urlpatterns = [
    path('main', views.MainView.as_view(), name='main'),

    ]