from django.core.management.base import BaseCommand
from django.utils.text import slugify
from products.models import Category, Product

DATA = [
    ("Royal Mandapam", "Mandapam", 35000, "A grand floral mandapam concept for a memorable wedding ceremony.", "Fresh floral styling\nDecorative pillars\nCustom theme", True),
    ("Floral Stage", "Wedding Decoration", 25000, "Elegant stage decoration designed for ceremonies and photography.", "Premium floral backdrop\nWarm lighting\nCustom colors", True),
    ("Bridal Entry", "Wedding Decoration", 12000, "A beautiful entrance concept for the bride and family.", "Floral entrance\nDecorative lights\nTheme matching", True),
    ("Luxury Invitation", "Invitations", 2500, "Premium invitation design for your special celebration.", "Custom names\nPremium paper\nEnvelope included", False),
    ("Reception Centerpiece", "Table Decor", 1800, "Elegant centerpiece styling for wedding reception tables.", "Floral arrangement\nTable styling\nTheme matching", False),
    ("Photo Backdrop", "Reception", 18000, "A statement backdrop for reception photographs.", "Photo-ready design\nLighting\nCustom layout", True),
]

class Command(BaseCommand):
    help = "Create sample wedding products."

    def handle(self, *args, **kwargs):
        for name, cat, price, desc, features, featured in DATA:
            category, _ = Category.objects.get_or_create(
                slug=slugify(cat),
                defaults={"name": cat},
            )
            Product.objects.update_or_create(
                slug=slugify(name),
                defaults={
                    "name": name,
                    "category": category,
                    "price": price,
                    "short_description": desc,
                    "description": desc + " Contact us for customization and product details.",
                    "features": features,
                    "featured": featured,
                    "is_active": True,
                },
            )
        self.stdout.write(self.style.SUCCESS("Sample products created."))
