from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveDestroyAPIView
from rest_framework import permissions
from .models import Listing
from .serializer import ListingSerializer, ListingDetailSerializer, ListingAddDetailSerializer
from datetime import datetime, timedelta
from django.utils import timezone

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class ListingsListAPIView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingRetrieveAPIView(RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingDetailSerializer
    lookup_field = 'slug'
    


class ListingCreateAPIView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Listing.objects.all()
    serializer_class = ListingAddDetailSerializer


class ListingsRetrieveUpdateDestroyAPIView(RetrieveDestroyAPIView, IsOwnerOrReadOnly):
    permission_classes = [permissions.AllowAny]
    queryset = Listing.objects.all()
    serializer_class = ListingDetailSerializer




""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""


class SearchView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ListingSerializer

    def post(self, request, format=None):
        qs = Listing.objects.order_by('-list_date').filter(is_published=True)
        data = self.request.data

        sale_type = data['sale_type']
        qs = qs.filter(sale_type__iexact=sale_type)

        price = data['price']
        if price== '$0+':
            price = 0
        elif price == '$200,000+':
            price = 200000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1,000,000+':
            price = 1000000
        elif price == '$1,200,000+':
            price = 1200000
        elif price == '$1,500,000+':
            price = 1500000
        elif price == 'Any':
            price = -1
        
        if price != -1:
            qs = qs.filter(price__gte=price)
        
        bedrooms = data['bedrooms']
        if bedrooms == '0+':
            bedrooms=0
        elif bedrooms == '1+':
            bedrooms=1
        elif bedrooms == '2+':
            bedrooms=2
        elif bedrooms == '3+':
            bedrooms=3
        elif bedrooms == '4+':
            bedrooms=4
        elif bedrooms == '5+':
            bedrooms=5

        qs = qs.filter(bedrooms__gte=bedrooms)

        home_type = data['home_type']
        qs = qs.filter(home_type__iexact=home_type)

        bathrooms = data['bathrooms']
        if bathrooms == '0+':
            bathrooms=0.0
        elif bathrooms == '1+':
            bathrooms=1.0
        elif bathrooms == '2+':
            bathrooms=2.0
        elif bathrooms == '3+':
            bathrooms=3.0
        elif bathrooms == '4+':
            bathrooms=4.0

        qs = qs.filter(bathrooms__gte=bathrooms)

        sqft = data['sqft']
        if sqft == '1000+':
            sqft = 1000
        elif sqft == '1200+':
            sqft = 1200
        elif sqft == '1400+':
            sqft = 1400
        elif sqft == '1600+':
            sqft = 1600
        elif sqft == '2000+':
            sqft = 2000
        elif sqft == 'Any':
            sqft = 0

        if sqft!=0:
            qs = qs.filter(sqft__gte=sqft)
        
        days_passed = data['days_listed']
        if days_passed == '1 or less':
            days_passed = 1
        elif days_passed == '2 or less':
            days_passed = 2
        elif days_passed == '5 or less':
            days_passed = 5
        elif days_passed == '10 or less':
            days_passed = 10
        elif days_passed == '20 or less':
            days_passed = 20
        elif days_passed == 'Any':
            days_passed = 0
        
        for query in qs:
            num_days = (datetime.now(timezone.utc) - query.list_date).days
            if days_passed !=0:
                if num_days > days_passed:
                    slug=query.slug
                    qs = qs.exclude(slug__iexact=slug)

        has_photos = data ['has_photos']
        if has_photos == '1+':
            has_photos = 1
        elif has_photos == '2+':
            has_photos = 2
        elif has_photos == '3+':
            has_photos = 3
        elif has_photos == '4+':
            has_photos = 4
        elif has_photos == '5+':
            has_photos = 5
        for query in qs:
            count = 0
            if query.photo_1:
                count+1
            if query.photo_2:
                count+1
            if query.photo_3:
                count+1
            if query.photo_4:
                count+1
            if count < has_photos:
                slug = query.slug
                qs = qs.exclude(slug__iexact=slug)

        open_house = data['open_house']
        qs = qs.filter(open_house__iexact=open_house)

        keywords = data['keywords']
        qs = qs.filter(description__icontains=keywords)

        serialize = ListingSerializer(qs, many=True)

        return Response(serialize.data)
