from rest_framework import serializers
from .models import Avocat , Adresse, DomaineSpecialisation

class DomaineSpecialisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomaineSpecialisation
        fields = ['nom']

class LocalisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adresse
        fields = ['latitude', 'longitude', 'ville']

class AvocatSerializer(serializers.ModelSerializer):
    #localisation = LocalisationSerializer()
    #specialisations = DomaineSpecialisationSerializer(many=True)

    class Meta:
        model = Avocat
        fields = ['nom', 'specialite', 'description', 'pays', 'ville', 'code_postal', 'rue', 'email' ,'password']