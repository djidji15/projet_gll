from django.db import models
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import User
from django.contrib import admin
from django.utils import timezone
# Address model
class Address(models.Model):
    """
    Modèle représentant une adresse.

    Attributes:
        street (str): Rue de l'adresse.
        city (str): Ville de l'adresse.
        state (str): État ou région de l'adresse.
        zip_code (str): Code postal de l'adresse.
        country (str): Pays de l'adresse.
        latitude (DecimalField): Latitude de l'adresse.
        longitude (DecimalField): Longitude de l'adresse.
    """
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)

# ClientProfile model, using OneToOneField for a one-to-one relationship with User
class ClientProfile(models.Model):
    """
    Modèle représentant le profil d'un client.

    Attributes:
        user (User): Utilisateur associé au profil client.
        age (int): Âge du client.
        gender (str): Genre du client.
        phone_number (str): Numéro de téléphone du client.
        address (Address): Adresse du client (facultatif).
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    gender = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    # address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name

    class Meta:
        ordering = ['user__first_name', 'user__last_name']

# LawyerProfile model, using OneToOneField for a one-to-one relationship with User
class LawyerProfile(models.Model):
    """
    Modèle représentant le profil d'un avocat.

    Attributes:
        user (User): Utilisateur associé au profil de l'avocat.
        specialization (str): Spécialisation de l'avocat.
        phone_number (str): Numéro de téléphone de l'avocat.
        bio (str): Biographie de l'avocat.
        language (str): Langues parlées par l'avocat.
        approved (bool): Indique si le profil de l'avocat est approuvé.
        rating (int): Évaluation moyenne de l'avocat.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    bio = models.CharField(max_length=255)
    #address = models.ForeignKey(Address, on_delete=models.CASCADE , related_name='lawyer_address')
    language = models.CharField(max_length=255)
    approved = models.BooleanField(default=True)
    rating = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
    


# Administrator model, using OneToOneField for a one-to-one relationship with User
class Administrator(models.Model):
    """
    Modèle représentant un administrateur.

    Attributes:
        user (User): Utilisateur associé à l'administrateur.
        name (str): Nom de l'administrateur.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

# TimeSlot model
class TimeSlot(models.Model):
    """
    Modèle représentant un créneau horaire pour un avocat.

    Attributes:
        day (str): Jour du créneau horaire.
        start_time (TimeField): Heure de début du créneau.
        end_time (TimeField): Heure de fin du créneau.
        lawyer (LawyerProfile): Avocat associé au créneau horaire.
    """
    day = models.CharField(max_length=255)
    start_time = models.TimeField()
    end_time = models.TimeField()
    lawyer = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE , related_name='time_slots')

# Appointment model
class Appointment(models.Model):
    """
    Modèle représentant un rendez-vous entre un client et un avocat.

    Attributes:
        time_slot (TimeSlot): Créneau horaire du rendez-vous.
        lawyer (LawyerProfile): Avocat avec lequel le rendez-vous est pris.
        client (ClientProfile): Client qui prend le rendez-vous.
        date (DateField): Date du rendez-vous.
        status (str): Statut du rendez-vous.
    """
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    lawyer = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE)
    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    status = models.CharField(max_length=255)

# Review model
class Review(models.Model):
    """
    Modèle représentant un avis laissé par un client pour un avocat.

    Attributes:
        lawyer (LawyerProfile): Avocat évalué.
        client (ClientProfile): Client laissant l'avis.
        rating (int): Note attribuée à l'avocat.
        comment (str): Commentaire sur l'avocat.
        date (DateField): Date de l'avis.
    """
    lawyer = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE)
    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)

# LawyerDocument model
class LawyerImage(models.Model):
    """
    Modèle représentant une image d'un avocat.

    Attributes:
        lawyer (LawyerProfile): Avocat associé à l'image.
        image (ImageField): Image de l'avocat.
    """
    lawyer = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='core/images', blank=True, null=True)

    def __str__(self):
        return f"Image for {self.lawyer.user.username}"



class LawyerDocument(models.Model):
    """
    Modèle représentant un document d'un avocat.

    Attributes:
        lawyer (LawyerProfile): Avocat associé au document.
        pdf_file (FileField): Fichier PDF du document.
    """
    lawyer = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE, related_name='documents')
    pdf_file = models.FileField(upload_to='core/docs', validators=[FileExtensionValidator(['pdf'])])

    def __str__(self):
        return f"Document for {self.lawyer.user.username}"


