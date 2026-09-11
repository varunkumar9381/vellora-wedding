from django.urls import path
from .views import (
    CategoryListView,
    ContactCreateView,
    FeaturedProductListView,
    ProductDetailView,
    ProductListView,
)

urlpatterns = [
    path("categories/", CategoryListView.as_view()),
    path("products/", ProductListView.as_view()),
    path("products/featured/", FeaturedProductListView.as_view()),
    path("products/<slug:slug>/", ProductDetailView.as_view()),
    path("contact/", ContactCreateView.as_view()),
]
