from rest_framework import serializers
from .models import Listing


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title','adress','city','state','price','sale_type','home_type','bedrooms','bathrooms','sqft','photo_main','slug')


class ListingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'
        lookup_field = 'slug'

class ListingAddDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        exclude = ['list_date']
    