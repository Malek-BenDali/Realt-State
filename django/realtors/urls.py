from django.urls import path
from .views import RealtorListAPIView, RealtorRetrieveAPIView, TopSellerListAPIView

urlpatterns = [
    path('', RealtorListAPIView.as_view()),
    path('topseller/', TopSellerListAPIView.as_view()),
    path('<pk>/', RealtorRetrieveAPIView.as_view()),
]
