from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken

class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        data = self.request.data

        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error' : 'Cet e-mail est déja utilisé'})
            else:
                if len(password) < 6:
                    return Response({'error' : 'Le mot de pass doit contenir au moin 6 caractère'})
                else:
                    user = User.objects.create_user(email=email,name=name, password = password)
                    user.save()
                    return Response({'success': 'Votre compte a été creé'})
        else:
            return Response({'error': 'Les mots de passes ne sont pas identique'})

class BlacklistTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()