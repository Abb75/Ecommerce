from rest_framework import serializers
from .models import Products


class ListProduct(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Products
        fields = ['id', 'slug','image', 'title', 'price', 'category', 'description', 'stock']
        
    def get_images(self, obj):
        # Récupérer les informations sur les images du modèle Products ici
        images_info = obj.image  # Remplacez par le nom réel de votre champ d'image

        # Convertir les informations sur les images en une représentation souhaitée
        images_representation = []  # Ajoutez les détails nécessaires ici

        for image_info in images_info:
            image_representation = {
                'url': image_info.url,

              
            }
            images_representation.append(image_representation)

        return images_representation