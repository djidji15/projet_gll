
from rest_framework import serializers
from .models import Address, LawyerProfile, LawyerImage, LawyerDocument , ClientProfile , User , TimeSlot , Appointment , Review
from .models import Administrator, LawyerProfile
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.forms import PasswordResetForm

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'time_slot', 'lawyer', 'client', 'date', 'status']
        depth = 1  # Pour inclure des détails sur les relations liées (optionnel)

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'state', 'zip_code', 'country']

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'day', 'start_time', 'end_time']

class LawyerImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        lawyer_profile_pk = self.context['lawyer_profile_pk']
        return LawyerImage.objects.create(lawyer_id=lawyer_profile_pk, **validated_data)

    class Meta:
        model = LawyerImage
        fields = ['id', 'image']


class LawyerProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False, allow_null=True)
    time_slots = TimeSlotSerializer(required=False, allow_null=True, many=True)
    rating = serializers.IntegerField(read_only=True)
    images= LawyerImageSerializer(many=True , read_only=True)

    class Meta:
        model = LawyerProfile
        fields = ['id', 'specialization', 'phone_number', 'bio', 'language', 'address', 'time_slots' , 'rating' , 'images']

    def create(self, validated_data):
        address_data = validated_data.pop('address', None)
        time_slots_data = validated_data.pop('time_slots', None)

        if address_data:
            address = Address.objects.create(**address_data)
            validated_data['address'] = address

        lawyer = LawyerProfile.objects.create(**validated_data)

        if time_slots_data:
            for slot_data in time_slots_data:
                TimeSlot.objects.create(lawyer=lawyer, **slot_data)

        # Include serialized TimeSlots in the response
        lawyer_time_slots = TimeSlot.objects.filter(lawyer=lawyer)
        time_slots_serializer = TimeSlotSerializer(lawyer_time_slots, many=True)
        validated_data['time_slots'] = time_slots_serializer.data

        return validated_data

    def update(self, instance, validated_data):
        instance.specialization = validated_data.get('specialization', instance.specialization)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.language = validated_data.get('language', instance.language)

        # Update Address
        address_data = validated_data.get('address')
        if address_data:
            instance.address.street = address_data.get('street', instance.address.street)
            instance.address.city = address_data.get('city', instance.address.city)
            instance.address.state = address_data.get('state', instance.address.state)
            instance.address.zip_code = address_data.get('zip_code', instance.address.zip_code)
            instance.address.country = address_data.get('country', instance.address.country)
            instance.address.save()

        # Update TimeSlots
        time_slots_data = validated_data.get('time_slots')
        if time_slots_data:
            instance.time_slots.all().delete()
            for slot_data in time_slots_data:
                TimeSlot.objects.create(lawyer=instance, **slot_data)

        instance.save()
        return instance




class LawyerDocumentSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        lawyer_profile_pk = self.context['lawyer_profile_pk']
        return LawyerDocument.objects.create(lawyer_id=lawyer_profile_pk, **validated_data)

    class Meta:
        model = LawyerDocument
        fields = ['id', 'pdf_file']


class ClientProfileSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    address = AddressSerializer(required=False, allow_null=True)

    class Meta:
        model = ClientProfile
        fields = ['id', 'age', 'gender', 'phone_number', 'address']

    def create(self, validated_data):
        address_data = validated_data.pop('address', None)

        if address_data:
            address = Address.objects.create(**address_data)
            validated_data['address'] = address

        client_profile = ClientProfile.objects.create(**validated_data)
        return client_profile
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class LawyerProfileAdminListSerializer(serializers.ModelSerializer):
    images = LawyerImageSerializer(many=True , read_only=True)
    documents = LawyerDocumentSerializer(many=True , read_only=True)
    first_name = serializers.CharField(source='user.first_name' , read_only=True)
    last_name = serializers.CharField(source='user.last_name' , read_only=True)

    class Meta:
        model = LawyerProfile
        fields = ['id','first_name', 'last_name', 'specialization', 'images', 'documents' , 'approved']



class ReviewSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()

    def get_client_name(self, obj):
        return obj.client.user.get_full_name()

    class Meta:
        model = Review
        fields = ['client_name', 'rating', 'comment', 'date']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

class LawyerRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    class Meta:
        model = LawyerProfile
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'specialization', 'phone_number', 'bio', 'language']

    def create(self, validated_data):
        user_data = {
            'username': validated_data.pop('username'),
            'password': validated_data.pop('password'),
            'email': validated_data.pop('email'),
            'first_name': validated_data.pop('first_name'),
            'last_name': validated_data.pop('last_name')
        }
        user = User.objects.create_user(**user_data)
        lawyer_profile = LawyerProfile.objects.create(user=user, **validated_data)
        return lawyer_profile
    
class ClientRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    class Meta:
        model = ClientProfile
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'age', 'gender', 'phone_number']

    def create(self, validated_data):
        user_data = {
            'username': validated_data.pop('username'),
            'password': validated_data.pop('password'),
            'email': validated_data.pop('email'),
            'first_name': validated_data.pop('first_name'),
            'last_name': validated_data.pop('last_name')
        }
        user = User.objects.create_user(**user_data)
        client_profile = ClientProfile.objects.create(user=user, **validated_data)
        return client_profile
    

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # Vérifier si l'email existe dans la base de données
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Nous n'avons pas trouvé d'utilisateur avec cet adresse e-mail.")
        return value

    def save(self):
        request = self.context.get('request')
        # Créer un objet PasswordResetForm et l'utiliser pour envoyer l'email
        options = {
            'use_https': request.is_secure(),
            'from_email': None,  # Optionnel : spécifiez une adresse d'envoi
            'request': request,
        }
        reset_form = PasswordResetForm(data={'email': self.validated_data['email']})
        assert reset_form.is_valid()
        reset_form.save(**options)    


class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)
    uid = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    def validate(self, attrs):
        self.reset_form = SetPasswordForm(user=self.user, data=attrs)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)
        return attrs

    def save(self):
        return self.reset_form.save()
