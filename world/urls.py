from django.urls import path, re_path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
  path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
  re_path(r'^.*', views.index, name='index'),
]