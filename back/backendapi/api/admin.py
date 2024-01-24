from django.contrib import admin
from .models import Avocat,Adresse,RendezVous,Commentaire,Client,DomaineSpecialisation

# Register your models here.
admin.site.register(Avocat),
admin.site.register(Adresse),
admin.site.register(RendezVous),
admin.site.register(Commentaire),
admin.site.register(Client),
admin.site.register(DomaineSpecialisation),
