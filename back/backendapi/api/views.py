from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Address, LawyerProfile, LawyerImage, LawyerDocument , ClientProfile , User , TimeSlot , Review, Appointment
from .serializer import AddressSerializer, LawyerProfileSerializer, LawyerImageSerializer, LawyerDocumentSerializer , ClientProfileSerializer , TimeSlotSerializer
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from allauth.socialaccount.models import SocialAccount, SocialToken
from rest_framework import generics, permissions
from .models import LawyerProfile
from .serializer import UserSerializer,AppointmentSerializer, ReviewSerializer, LawyerRegistrationSerializer
from django.contrib.auth.models import User
from .serializer import LawyerProfileAdminListSerializer,LoginSerializer
from django.utils import timezone
from django.db.models import Q
from allauth.socialaccount.models import SocialAccount
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound
from django.db.models import Avg
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import LawyerProfile, ClientProfile, TimeSlot, Appointment
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from .models import LawyerProfile, Administrator
from .serializer import  LawyerProfileAdminListSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout
from .serializer import LoginSerializer
from django.contrib.auth import authenticate, login, logout
from .serializer import LoginSerializer,ClientRegistrationSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info_from_google_token(request):
    google_token = request.data.get('google_token', None)

    if not google_token:
        return Response({'error': 'Google token not provided'}, status=400)

    try:
        social_account = SocialAccount.objects.get(token=google_token, provider='google')

        user_profile = social_account.user.userprofile  

        user_info = {
            'username': user_profile.user.username,
            'email': user_profile.user.email,
            'first_name': user_profile.user.first_name,
            'last_name': user_profile.user.last_name,
        }

        return Response(user_info, status=200)

    except SocialAccount.DoesNotExist:
        return Response({'error': 'Invalid Google token'}, status=400)




# class GoogleAccessTokenView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get( self , request, *args, **kwargs):
#         try:
#             google_account = SocialAccount.objects.get(user=request.user, provider='google')
#             google_token = google_account.socialtoken_set.get()
#             access_token = str(google_token.token)  # Convert the SocialToken to a string
#             return Response({'access_token': access_token})
#         except SocialAccount.DoesNotExist:
#             return Response({'error': 'No linked Google account for the user.'}, status=404)
#         except SocialToken.DoesNotExist:
#             return Response({'error': 'No Google access token found for the user.'}, status=404)
#         except Exception as e:
#             return Response({'error': f'An error occurred: {str(e)}'}, status=500)



class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer



class LawyerImageViewSet(viewsets.ModelViewSet):
    """
    Vue pour gérer les images associées aux profils d'avocats.

    Cette vue permet de lister, créer, récupérer, mettre à jour et supprimer des images pour un avocat spécifique.
    """

    def get_serializer_context(self):
        """
        Ajoute l'identifiant du profil d'avocat au contexte du serializer.
        """
        context = super().get_serializer_context()
        lawyer_profile_pk = self.kwargs['lawyer_pk']
        context['lawyer_profile_pk'] = lawyer_profile_pk
        return context
    
    def get_queryset(self):
        """
        Retourne un queryset des images pour l'avocat spécifié dans l'URL.
        """
        lawyer_profile_pk = self.kwargs['lawyer_pk']
        return LawyerImage.objects.filter(lawyer_id=lawyer_profile_pk)



class LawyerDocumentViewSet(viewsets.ModelViewSet):
    queryset = LawyerDocument.objects.all()
    serializer_class = LawyerDocumentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        lawyer_profile_pk = self.kwargs['lawyer_pk']
        context['lawyer_profile_pk'] = lawyer_profile_pk
        return context    

    def get_queryset(self):
        ##
        lawyer_profile_pk = self.kwargs['lawyer_pk']
        return LawyerDocument.objects.filter(lawyer_id=lawyer_profile_pk)  


class LawyerProfileViewSet(viewsets.ModelViewSet):
    """
    Vue pour gérer les profils d'avocats.

    Cette vue permet de lister, créer, récupérer, mettre à jour et supprimer des profils d'avocats.
    Les utilisateurs authentifiés peuvent accéder à cette vue, mais seuls les avocats approuvés sont listés.
    """
    queryset = LawyerProfile.objects.prefetch_related('images', 'documents').all()
    serializer_class = LawyerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retourne un queryset des profils d'avocats approuvés.
        """
        return LawyerProfile.objects.filter(approved=True)
    
    @action(methods=['post'], detail=False, permission_classes=[permissions.AllowAny])
    def register(self, request, *args, **kwargs):
        """
        Action pour enregistrer un nouvel avocat.

        Permet à n'importe quel utilisateur de créer un profil d'avocat.
        """
        serializer = LawyerRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            lawyer_profile = serializer.save()

            # Ajouter l'utilisateur au groupe 'Lawyer'
            group, _ = Group.objects.get_or_create(name='Lawyer')
            lawyer_profile.user.groups.add(group)

            return Response({
                'username': lawyer_profile.user.username,
                'specialization': lawyer_profile.specialization
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def perform_create(self, serializer):
        user = self.request.user

        # Check if the user is a client
        if ClientProfile.objects.filter(user=user).exists():
            raise PermissionDenied('Clients cannot create a lawyer profile')

        # Check if a lawyer profile already exists for the user
        if LawyerProfile.objects.filter(user=user).exists():
            raise PermissionDenied('Lawyer profile already exists for the user')

        # Save the lawyer profile
        serializer.save(user=user)

        # Add the user to the 'Lawyer' group
        if user.is_authenticated and not user.groups.filter(name='Lawyer').exists():
            group_name = 'Lawyer'
            group, created = Group.objects.get_or_create(name=group_name)
            user.groups.add(group)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the lawyer profile is approved
        if not instance.approved:
            raise NotFound('Lawyer profile not found or not approved.')

        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Calculate and include the rating information in the serialized response
        data = serializer.data
        for item in data:
            lawyer_id = item['id']
            rating = Review.objects.filter(lawyer__id=lawyer_id).aggregate(Avg('rating'))['rating__avg']
            item['rating'] = rating

        return Response(data)


            


class ClientProfileViewSet(viewsets.ModelViewSet):
    """
    Vue pour gérer les profils de clients.

    Cette vue permet de lister, créer, récupérer, mettre à jour et supprimer des profils de clients.
    Les utilisateurs authentifiés peuvent accéder à cette vue, mais un avocat ne peut pas voir ou créer des profils de clients.
    """
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retourne un queryset des profils de clients pour l'utilisateur connecté, sauf si l'utilisateur est un avocat.
        """
        user = self.request.user
        if LawyerProfile.objects.filter(user=user).exists():
            raise PermissionDenied('Lawyers cannot see a client profile')
        else:
            return ClientProfile.objects.filter(user=user)
        
    @action(methods=['post'], detail=False, permission_classes=[permissions.AllowAny])
    def register(self, request, *args, **kwargs):
        """
        Action pour enregistrer un nouveau client.

        Permet à n'importe quel utilisateur de créer un profil de client.
        """
        serializer = ClientRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            client_profile = serializer.save()
            return Response({
                'username': client_profile.user.username,
                'first_name': client_profile.user.first_name,
                'last_name': client_profile.user.last_name,
                'age': client_profile.age,
                'gender': client_profile.gender,
                'phone_number': client_profile.phone_number
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def perform_create(self, serializer):
        user = self.request.user
        if LawyerProfile.objects.filter(user=user).exists():
            raise PermissionDenied('Lawyers cannot create a client profile')

        if ClientProfile.objects.filter(user=user).exists():
            raise PermissionDenied('Client profile already exists for the user')
        else:
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_profile(self, request):
        user = request.user
        try:
            client_profile = ClientProfile.objects.get(user=user)
            serializer = self.get_serializer(client_profile)
            return Response(serializer.data)
        except ClientProfile.DoesNotExist:
            return Response({'error': 'Profil client non trouvé'}, status=404)        


class LawyerAdminDashboardViewSet(viewsets.ModelViewSet):
    """
    Vue pour gérer le tableau de bord administratif des avocats.

    Permet la consultation et la modification des profils d'avocats par les administrateurs.
    """
    queryset = LawyerProfile.objects.prefetch_related('images', 'documents').all()
    permission_classes = [permissions.IsAdminUser]  # Assurez-vous que seuls les utilisateurs admin y ont accès
    serializer_class = LawyerProfileAdminListSerializer

    def create(self, request, *args, **kwargs):
        return Response({'error': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({'message': 'Avocat supprimé avec succès.'}, status=status.HTTP_200_OK)
        except Exception as e:
            # Vous pouvez personnaliser ce message en fonction de l'exception
            return Response({'error': f'Erreur lors de la suppression de l\'avocat : {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def lawyer_profile_search(request):
    """
    Recherche de profils d'avocats.

    Permet de rechercher des profils d'avocats en fonction de critères spécifiques.
    """
    lawyer_category = request.GET.get('lawyer_category', '')
    location = request.GET.get('location', '')
    language = request.GET.get('language', '')


    search_results = LawyerProfile.objects.filter(approved=True)
    print(lawyer_category)

    if lawyer_category:
        lawyer_filter = (
            Q(user__first_name__icontains=lawyer_category) |
            Q(specialization__icontains=lawyer_category)
        )
        search_results = search_results.filter(lawyer_filter)

    if location:
        address_filter = (
            Q(address__street__icontains=location) |
            Q(address__city__icontains=location) |
            Q(address__state__icontains=location) |
            Q(address__country__icontains=location)
        )
        #search_results = search_results.filter(address_filter)
    if language:
        language_filter = Q(language__icontains=language)
        search_results = search_results.filter(language_filter)
        search_results = search_results.order_by('-rating')
        print(search_results)
    
    search_results = search_results.order_by('-rating')
    
    serialized_results = LawyerProfileSerializer(search_results, many=True).data
    return Response({'search_results': serialized_results})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    """
    Crée un rendez-vous entre un avocat et un client.

    Permet à un client de planifier un rendez-vous avec un avocat.
    """

    lawyer_id = request.data.get('lawyer_id')
    date = request.data.get('date')
    start_time_str = request.data.get('start_time')

    # Vérifier si l'avocat existe et est approuvé
    lawyer = get_object_or_404(LawyerProfile, pk=lawyer_id, approved=True)

    # Vérifier si l'utilisateur est un client
    client = get_object_or_404(ClientProfile, user=request.user)

    # Convertir start_time en objet datetime
    start_datetime = datetime.strptime(start_time_str, '%H:%M')

    # Ajouter une heure pour obtenir end_time
    end_datetime = start_datetime + timedelta(hours=1)
    end_time_str = end_datetime.strftime('%H:%M')

    # Créer ou récupérer le créneau horaire
    time_slot, created = TimeSlot.objects.get_or_create(
        day=date, start_time=start_time_str, end_time=end_time_str, lawyer=lawyer
    )

    # Vérifier si le rendez-vous est déjà pris
    if Appointment.objects.filter(time_slot=time_slot).exists():
        return Response({"message": "Rendez-vous non disponible"}, status=400)

    # Créer le rendez-vous
    appointment = Appointment.objects.create(
        time_slot=time_slot, lawyer=lawyer, client=client, date=date, status="Scheduled"
    )

    return Response({"message": "Rendez-vous confirmé", "appointment_id": appointment.id}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def appointments_for_lawyer(request):
    """
    Liste les rendez-vous pour un avocat.

    Renvoie la liste des rendez-vous planifiés pour l'avocat connecté.
    """
    user = request.user
    try:
        lawyer_profile = LawyerProfile.objects.get(user=user)
    except LawyerProfile.DoesNotExist:
        return Response({'error': 'Profil avocat non trouvé'}, status=404)

    appointments = Appointment.objects.filter(lawyer=lawyer_profile)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def appointments_for_client(request):
    """
    Liste les rendez-vous pour un client.

    Renvoie la liste des rendez-vous planifiés pour le client connecté.
    """
    user = request.user
    try:
        client_profile = ClientProfile.objects.get(user=user)
    except ClientProfile.DoesNotExist:
        return Response({'error': 'Profil client non trouvé'}, status=404)

    appointments = Appointment.objects.filter(client=client_profile)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request, lawyer_id):
    # Récupérer les données de la requête
    rating = request.data.get('rating')
    comment = request.data.get('comment')

    # Vérifier si l'avocat existe
    try:
        lawyer = LawyerProfile.objects.get(pk=lawyer_id)
    except LawyerProfile.DoesNotExist:
        return Response({'error': 'Avocat non trouvé'}, status=404)

    # Créer la review
    review = Review.objects.create(
        lawyer=lawyer,
        client=request.user.clientprofile,
        rating=rating,
        comment=comment
    )

    # Serializer pour la réponse
    serializer = ReviewSerializer(review)
    return Response(serializer.data, status=201)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reviews_for_lawyer(request, lawyer_id):
    """
    Liste les avis pour un avocat.

    Renvoie la liste des avis laissés pour un avocat spécifique.
    """
    # Récupérer les données de la requête
    rating = request.data.get('rating')
    comment = request.data.get('comment')

    # Vérifier si l'avocat existe
    try:
        lawyer = LawyerProfile.objects.get(pk=lawyer_id)
    except LawyerProfile.DoesNotExist:
        return Response({'error': 'Avocat non trouvé'}, status=404)

    # Créer la review
    review = Review.objects.create(
        lawyer=lawyer,
        client=request.user.clientprofile,
        rating=rating,
        comment=comment
    )

    # Serializer pour la réponse
    serializer = ReviewSerializer(review)
    return Response(serializer.data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def average_rating_for_lawyer(request, lawyer_id):
    """
    Calcule la note moyenne d'un avocat.

    Renvoie la note moyenne calculée à partir des avis sur l'avocat.
    """
    try:
        reviews = Review.objects.filter(lawyer_id=lawyer_id)
    except Review.DoesNotExist:
        return Response({'error': 'Aucune review trouvée pour cet avocat'}, status=404)

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def average_rating_for_lawyer(request, lawyer_id):
    try:
        average_rating = Review.objects.filter(lawyer_id=lawyer_id).aggregate(Avg('rating'))['rating__avg']
    except Review.DoesNotExist:
        return Response({'error': 'Aucune review trouvée pour cet avocat'}, status=404)

    return Response({'average_rating': average_rating})


class LawyerLoginView(APIView):
    """
    Vue pour la connexion des avocats.

    Permet aux avocats de se connecter au système.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Traite les demandes POST pour la connexion des avocats.
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None and user.groups.filter(name='Lawyer').exists():
                login(request, user)
                return Response({'detail': 'Connexion réussie.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Informations de connexion invalides ou lutilisateur nest pas un avocat.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """
        Traite les demandes DELETE pour la déconnexion des avocats.
        """
        logout(request)
        return Response({'detail': 'Déconnexion réussie.'}, status=status.HTTP_200_OK)
    
class ClientLoginView(APIView):
    """
    Vue pour la connexion des clients.

    Permet aux clients de se connecter au système.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Traite les demandes POST pour la connexion des clients.
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None and ClientProfile.objects.filter(user=user).exists():
                login(request, user)
                return Response({'detail': 'Connexion réussie.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Informations de connexion invalides ou lutilisateur nest pas un client.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """
        Traite les demandes DELETE pour la déconnexion des clients.
        """
        logout(request)
        return Response({'detail': 'Déconnexion réussie.'}, status=status.HTTP_200_OK)
    
class AdminLoginView(APIView):
    """
    Vue pour la connexion des administrateurs.

    Permet aux administrateurs de se connecter au système.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Traite les demandes POST pour la connexion des administrateurs.
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None and user.is_superuser:
                login(request, user)
                return Response({'detail': 'Connexion réussie.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Informations de connexion invalides ou l\'utilisateur n\'est pas un administrateur.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        """
        Traite les demandes POST pour la connexion des administrateurs.
        """
        logout(request)
        return Response({'detail': 'Déconnexion réussie.'}, status=status.HTTP_200_OK)
    

"""class PasswordResetView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            if user:
                token = default_token_generator.make_token(user)
                # Envoyer l'email ici (à implémenter)
                send_mail(
                    'Réinitialisation du mot de passe',
                    f'Votre jeton de réinitialisation est : ',
                    'from@example.com',
                    [user.email],
                    fail_silently=False,
                )
                return Response({'detail': 'E-mail de réinitialisation envoyé.'})
            return Response({'detail': 'Aucun utilisateur trouvé avec cet e-mail.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(email=serializer.validated_data['email'])
            token = serializer.validated_data['token']
            if default_token_generator.check_token(user, token):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response({'detail': 'Mot de passe réinitialisé avec succès.'})
            return Response({'detail': 'Jeton invalide.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    """