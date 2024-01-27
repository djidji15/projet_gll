"""from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import  AvocatCreateView,AvocatListView, AvocatRetrieveUpdateDestroyView,RechercheAvocatAPIView
urlpatterns = [
    #path('admin/', admin.site.urls),
    path('avocats/ajouter/', AvocatCreateView.as_view(), name='ajouter_avocat'),
    path('avocats/liste/', AvocatListView.as_view(), name='liste_avocats'),
    path('avocats/<int:pk>/', AvocatRetrieveUpdateDestroyView.as_view(), name='avocat-retrieve-update-destroy'),
    path('api/avocats/recherche/', RechercheAvocatAPIView.as_view(), name='recherche_avocats_api')
]
"""
from django.urls import path
from rest_framework_nested import routers
from . import views
from .views import create_appointment,appointments_for_lawyer,appointments_for_client,reviews_for_lawyer,create_review,average_rating_for_lawyer,get_user_info_from_google_token,LawyerAdminDashboardViewSet,LawyerLoginView,ClientLoginView,AdminLoginView
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

router = routers.DefaultRouter()
router.register(r'lawyers', views.LawyerProfileViewSet , basename='lawyer-profile')
router.register(r'clients', views.ClientProfileViewSet, basename='client-profile')#
router.register(r'dashboard', views.LawyerAdminDashboardViewSet , basename='lawyer-admin-dashboard')

lawyers_router = routers.NestedSimpleRouter(router, r'lawyers', lookup='lawyer')
lawyers_router.register(r'images', views.LawyerImageViewSet, basename='lawyer-images')
lawyers_router.register(r'documents', views.LawyerDocumentViewSet, basename='lawyer-documents')

lawyers_dashbord = routers.NestedSimpleRouter(router, r'dashboard', lookup='lawyer')




urlpatterns = router.urls + lawyers_router.urls +  lawyers_dashbord.urls + [
    path('lawyer-profile-search/', views.lawyer_profile_search),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('appointments/create/', create_appointment, name='create_appointment'),
    path('appointments/lawyer/', appointments_for_lawyer, name='appointments_for_lawyer'),
    path('appointments/client/', appointments_for_client, name='appointments_for_client'),
    path('lawyers/<int:lawyer_id>/reviews/', views.create_review, name='create_review'),
    path('lawyer/<int:lawyer_id>/reviews/', reviews_for_lawyer, name='reviews_for_lawyer'),
    path('lawyer/<int:lawyer_id>/average-rating/', average_rating_for_lawyer, name='average_rating_for_lawyer'),
    path('google-user-info/', get_user_info_from_google_token, name='google_user_info'),
    path('api/lawyer-login/', LawyerLoginView.as_view(), name='api_lawyer_login'),
    path('api/client-login/', ClientLoginView.as_view(), name='api_client_login'),
    path('api/admin-login/', AdminLoginView.as_view(), name='api_admin_login'),
    path('lawyers/register/', views.LawyerProfileViewSet.as_view({'post': 'register'}), name='lawyer-register'),
    path('clients/register/', views.ClientProfileViewSet.as_view({'post': 'register'}), name='client-register'),
   
    #path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    #path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('auth/', include('dj_rest_auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('', include(router.urls)),
]



