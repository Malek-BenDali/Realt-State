from django.urls import path
from .views import ListingsListAPIView, ListingRetrieveAPIView, SearchView

app_name='listings'

urlpatterns = [
    path('', ListingsListAPIView.as_view()),
    path('search/', SearchView.as_view()),
    path('<slug>', ListingRetrieveAPIView.as_view()),
]
