from rest_framework import serializers
from api.models import User, UserProfile
from rest_auth.serializers import PasswordResetSerializer
from allauth.account.forms import ResetPasswordForm 
from django.conf import settings
from django.utils.translation import gettext as _
from django.contrib.auth.forms import PasswordResetForm , SetPasswordForm
from django.utils.encoding import force_text
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode as uid_decoder

from rest_framework.exceptions import ValidationError


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ( 'country', 'date_of_birth', 'gender', 'phone_number')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Bifrost user writable nested serializer
    """
    profile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('url', 'email', 'first_name', 'last_name', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # profile.title = profile_data.get('title', profile.title)
        # profile.dob = profile_data.get('dob', profile.dob)
        # profile.address = profile_data.get('address', profile.address)
        # profile.country = profile_data.get('country', profile.country)
        # profile.city = profile_data.get('city', profile.city)
        # profile.zip = profile_data.get('zip', profile.zip)
        # profile.photo = profile_data.get('photo', profile.photo)
        profile.date_of_brith = profile_data.get('date_of_birth', profile.date_of_birth)
        # profile.address = profile_data.get('address', profile.address)
        profile.country = profile_data.get('country', profile.country)
        profile.gender = profile_data.get('gender', profile.gender)
        profile.phone_number = profile_data.get('phone_number', profile.phone_number)
        profile.save()

        return instance
 

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm
    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))

        ###### FILTER YOUR USER MODEL ######
        if not User.objects.filter(email=value).exists():

            raise serializers.ValidationError(_('Invalid e-mail address'))
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),

            ###### USE YOUR TEXT FILE ######
            'email_template_name': 'example_message.txt',

            'request': request,
        }
        self.reset_form.save(**opts)




class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """

    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)

    uid = serializers.CharField(required=True)
    token = serializers.CharField(required=True)

    set_password_form_class = SetPasswordForm

    def custom_validation(self, attrs):
        pass

    def validate(self, attrs):
        self._errors = {}

        # Decode the uidb64 to uid to get User object
        try:
            uid = force_text(uid_decoder(attrs['uid']))
            self.user = User._default_manager.get(pk=uid)
        except:
            raise ValidationError({'uid': ['Invalid value']})

        self.custom_validation(attrs)
        # Construct SetPasswordForm instance
        self.set_password_form = self.set_password_form_class(
            user=self.user, data=attrs
        )
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        if not default_token_generator.check_token(self.user, attrs['token']):
            raise ValidationError({'token': ['Invalid value']})

        return attrs

    def save(self):
        self.set_password_form.save()