from rest_framework import permissions
from rest_framework.views import APIView
from .models import contact
from django.core.mail import send_mail
from rest_framework.response import Response

class ContactCreateView(APIView):
    permission_classes=[permissions.AllowAny]

    def post(self, request, format=None):
        data = self.request.data

        try:
            send_mail(
                data['subject'],
                'Name ' + data['name']
                +'\nEmail: '
                +data['email']
                +'\n\nMessage : '
                +data['message'],
                'testmalekprojects@gmail.com',
                ['testmalekprojects@gmail.com'],
                fail_silently=False
            )

            Contact = contact(name=data['name'], email=data['email'], subject=data['subject'], message=data['message'])
            Contact.save()

            return Response({'success' : 'Message envoyé'})
        except:
            return Response({'error': "Erreur d'envoie"})

