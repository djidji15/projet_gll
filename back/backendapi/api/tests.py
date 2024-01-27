from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from .models import LawyerProfile 
from .models import ClientProfile

def test_register_new_lawyer(self):
    """
    Teste l'enregistrement d'un nouvel avocat.
    """
    url = reverse('lawyer-register')  # URL de l'action register de LawyerProfileViewSet
    lawyer_data = {
        "username": "avocattt1",
        "password": "motdepasse1263",
        "email": "avocattt1@example.com",
        "first_name": "Prénom",
        "last_name": "Nom",
        "specialization": "Droit civil",
        "phone_number": "0123456789",
        "bio": "Biographie de l'avocat",
        "language": "Français"
    }
    response = self.client.post(url, lawyer_data, format='json')

    # Vérifier que la requête a réussi
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Autres vérifications...

class ClientProfileViewSetTest(APITestCase):
    
    def test_register_client(self):
        """
        Teste l'enregistrement d'un nouveau client.
        """
        url = reverse('client-register')  # Assurez-vous que ce nom correspond à votre URL
        client_data = {
            "username": "soso",
            "password": "soso",
            "email": "soso@example.com",
            "first_name": "soso",
            "last_name": "soso",
            "age": 30,
            "gender": "Masculin",
            "phone_number": "0126556789"
        }
        response = self.client.post(url, client_data, format='json')

        # Vérifier que la requête a réussi
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Vérifier que le client a été créé dans la base de données
        self.assertTrue(ClientProfile.objects.filter(user__username='soso').exists())

        # Autres vérifications...

    