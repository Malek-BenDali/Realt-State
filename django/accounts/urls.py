from django.urls import path
from .views import SignupView, BlacklistTokenView

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('logout/blacklist/', BlacklistTokenView.as_view())
]

