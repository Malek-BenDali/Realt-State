from django.urls import path
from .views import ListingsListAPIView, ListingRetrieveAPIView, SearchView, ListingCreateAPIView

app_name='listings'

urlpatterns = [
    path('', ListingsListAPIView.as_view()),
    path('search/', SearchView.as_view()),
    path('create/', ListingCreateAPIView.as_view()),
    path('<slug>', ListingRetrieveAPIView.as_view()),
]
