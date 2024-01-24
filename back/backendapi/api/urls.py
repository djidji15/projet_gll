from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import  AvocatCreateView,AvocatListView, AvocatRetrieveUpdateDestroyView,RechercheAvocatAPIView
urlpatterns = [
    #path('admin/', admin.site.urls),
    path('avocats/ajouter/', AvocatCreateView.as_view(), name='ajouter_avocat'),
    path('avocats/liste/', AvocatListView.as_view(), name='liste_avocats'),
    path('avocats/<int:pk>/', AvocatRetrieveUpdateDestroyView.as_view(), name='avocat-retrieve-update-destroy'),
    path('api/avocats/recherche/', RechercheAvocatAPIView.as_view(), name='recherche_avocats_api')
]




