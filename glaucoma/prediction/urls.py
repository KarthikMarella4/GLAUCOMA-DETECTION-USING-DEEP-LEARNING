from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('prediction',views.prediction,name='prediction'),
    path('download-pdf/', views.download_pdf, name='download_pdf'),
    path('download-python/', views.download_python_file, name='download_python_file'),

]
