from django.db import models
from django.contrib.auth.models import User

class Avocat(models.Model):
    nom = models.CharField(max_length=255)
    specialite = models.CharField(max_length=255)
    description = models.TextField()
    pays = models.CharField(max_length=255)
    ville = models.CharField(max_length=255)
    code_postal = models.CharField(max_length=20)
    rue = models.CharField(max_length=255)
    email = models.EmailField(unique=True, default='default@example.com')
    password = models.CharField(max_length=255,default='default@example.com')
    langue = models.CharField(max_length=255,default='francais')
    def __str__(self):
        return self.nom
    
class DomaineSpecialisation(models.Model):
    """
    Modèle représentant un domaine de spécialisation d'un avocat.

    Attributes:
        nom (str): Le nom du domaine de spécialisation.
        avocat (ForeignKey): La relation avec l'avocat associé à ce domaine de spécialisation.
    """
    nom = models.CharField(max_length=60)
    avocat = models.ForeignKey(Avocat, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom    
    
class Adresse(models.Model):
    rue = models.CharField(max_length=255)
    ville = models.CharField(max_length=255)
    pays = models.CharField(max_length=255)
    avocat = models.ForeignKey(Avocat, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return f"{self.rue}, {self.ville}, {self.pays}"
class RendezVous(models.Model):
    avocat = models.ForeignKey(Avocat, on_delete=models.CASCADE)
    client = models.ForeignKey(User, on_delete=models.CASCADE)  # Utilisez le modèle User de Django pour représenter les clients
    date = models.DateField()
    creneau_horaire = models.CharField(max_length=255)

    def __str__(self):
        return f"Rendez-vous le {self.date} avec {self.avocat.nom}"    
class Commentaire(models.Model):
    avocat = models.ForeignKey(Avocat, on_delete=models.CASCADE)
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.PositiveIntegerField()
    commentaire = models.TextField()

    def __str__(self):
        return f"Commentaire pour {self.avocat.nom} par {self.client.username}"


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nom = models.CharField(max_length=255)
    email = models.EmailField()
    mot_de_passe = models.CharField(max_length=255)  # Note: Stockez les mots de passe de manière sécurisée, ne stockez pas les mots de passe en clair

    def __str__(self):
        return self.nom      