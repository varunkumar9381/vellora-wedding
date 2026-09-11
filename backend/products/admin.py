from django.contrib import admin
from .models import Category, ContactMessage, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "featured", "is_active", "updated_at")
    list_filter = ("category", "featured", "is_active")
    search_fields = ("name", "short_description", "description")
    prepopulated_fields = {"slug": ("name",)}
    list_editable = ("featured", "is_active")
    readonly_fields = ("created_at", "updated_at")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "phone", "message")
    readonly_fields = ("name", "email", "phone", "message", "created_at")
    list_editable = ("is_read",)
