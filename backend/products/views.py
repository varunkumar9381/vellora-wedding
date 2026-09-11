from django.db.models import Q
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Product
from .serializers import CategorySerializer, ContactMessageSerializer, ProductSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True)
        q = self.request.query_params.get("q", "").strip()
        category = self.request.query_params.get("category", "").strip()

        if q:
            qs = qs.filter(
                Q(name__icontains=q)
                | Q(short_description__icontains=q)
                | Q(description__icontains=q)
            )
        if category.isdigit():
            qs = qs.filter(category_id=category)
        return qs


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = "slug"


class FeaturedProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True, featured=True)[:6]
    serializer_class = ProductSerializer


class ContactCreateView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Thank you! Your message has been received."}, status=201)
