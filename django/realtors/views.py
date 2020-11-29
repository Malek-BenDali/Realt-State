from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Realtor
from .serializer import RealtorSerializer


class RealtorListAPIView(ListAPIView):
    """ about page """
    permission_classes = [permissions.AllowAny]
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer
    pagination_class = None


class RealtorRetrieveAPIView(RetrieveAPIView):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer


class TopSellerListAPIView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Realtor.objects.filter(top_seller=True)
    serializer_class = RealtorSerializer
    pagination_class = None






