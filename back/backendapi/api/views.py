from django.shortcuts import render
from rest_framework import generics
from .models import Avocat
from .serializer import AvocatSerializer
from rest_framework.permissions import IsAuthenticated  
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.views import APIView

# Create your views here.
class AvocatCreateView(generics.CreateAPIView):
    queryset = Avocat.objects.all()
    serializer_class = AvocatSerializer
    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        password = validated_data.get('password')
        
        # Hasher le mot de passe
        hashed_password = make_password(password)
        
        # Mettre à jour le champ password avec le mot de passe hashé
        validated_data['password'] = hashed_password

        # Enregistrer l'avocat dans la base de données
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class AvocatListView(generics.ListAPIView):
    queryset = Avocat.objects.all()
    serializer_class = AvocatSerializer

class AvocatRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Avocat.objects.all()
    serializer_class = AvocatSerializer    



class RechercheAvocatAPIView(APIView):
    def get(self, request, format=None):
        specialite_query = request.query_params.get('specialite', '')
        langue_query = request.query_params.get('langue', '')
        ville_query = request.query_params.get('ville', '')

        avocats = Avocat.objects.all()

        if specialite_query:
            avocats = avocats.filter(domainespecialisation__nom__icontains=specialite_query)

        if langue_query:
            avocats = avocats.filter(langue__icontains=langue_query)

        if ville_query:
            avocats = avocats.filter(ville__icontains=ville_query)

        serializer = AvocatSerializer(avocats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)   