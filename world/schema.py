from django.db import models
from graphene_django import DjangoObjectType
import graphene

from .models import City as CityModel, Country as CountryModel, Countrylanguage as LanguageModel
from .utils import get_distinct, value_if_in_distinct, get_paginator

DEFAULT_PAGE_SIZE = 15

class City(DjangoObjectType):
    class Meta:
        model = CityModel
    
class CityList(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    count = graphene.Int()
    objects = graphene.List(City)

class Language(DjangoObjectType):
    class Meta:
        model = LanguageModel

class Country(DjangoObjectType):
    cities = graphene.Field(
        CityList, 
        page=graphene.Int(), 
        page_size=graphene.Int(), 
        name_like= graphene.String(),
    )
    languages = graphene.List(Language)

    def resolve_cities(parent, info, page=None, page_size=DEFAULT_PAGE_SIZE, name_like=None):
        query_set = CityModel.objects.filter(countrycode=parent.code).order_by('name')
        if name_like:
            query_set = query_set.filter(name__icontains=name_like)
        return get_paginator(
            query_set, 
            page_size, 
            page, 
            CityList
        )

    def resolve_languages(parent, info):
        return LanguageModel.objects.filter(countrycode=parent.code).order_by('-percentage')

    class Meta:
        model = CountryModel

class CountryList(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    count = graphene.Int()
    objects = graphene.List(Country)

class Region(graphene.ObjectType):
    name = graphene.String()
    countries = graphene.Field(CountryList, page=graphene.Int(), page_size=graphene.Int())

    def resolve_name(parent, info):
        return parent
    
    def resolve_countries(parent, info, page=None, page_size=DEFAULT_PAGE_SIZE):
        return get_paginator(
            CountryModel.objects.filter(region=parent).order_by('name'), 
            page_size, 
            page, 
            CountryList
        )

class Continent(graphene.ObjectType):
    name = graphene.String()
    countries = graphene.Field(CountryList, page=graphene.Int(), page_size=graphene.Int())
    regions = graphene.List(Region)

    def resolve_name(parent, info):
        return parent

    def resolve_countries(parent, info, page=None, page_size=DEFAULT_PAGE_SIZE):
        return get_paginator(
            CountryModel.objects.filter(continent=parent).order_by('name'), 
            page_size, 
            page, 
            CountryList
        )
    
    def resolve_regions(parent, info):
        return get_distinct('region', CountryModel.objects.filter(continent=parent))

class Query(graphene.ObjectType):
    cities = graphene.Field(CityList, page=graphene.Int(), page_size=graphene.Int())
    continents = graphene.List(Continent)
    countries = graphene.Field(CountryList, page=graphene.Int(), page_size=graphene.Int())
    regions = graphene.List(Region)
    languages = graphene.List(Language)

    continent = graphene.Field(Continent, name=graphene.String(required=True))
    region = graphene.Field(Region, name=graphene.String(required=True))
    country = graphene.Field(Country, code=graphene.ID(required=True))
    city = graphene.Field(City, id=graphene.ID(required=True))

    # City Resolvers
    def resolve_city(parent, info, id):
        return CityModel.objects.get(id=id)

    def resolve_cities(parent, info, page=None, page_size=DEFAULT_PAGE_SIZE):
        return get_paginator(CityModel.objects.all(), page_size, page, CityList)

    # Country Resolvers
    def resolve_countries(parent, info, page=None, page_size=DEFAULT_PAGE_SIZE):
        return get_paginator(
            CountryModel.objects.all().order_by('name'), 
            page_size, 
            page, 
            CountryList
        )
    
    def resolve_country(parent, info, code):
        return CountryModel.objects.get(code=code)
    
    # Continent Resolvers
    def resolve_continents(parent, info):
        return get_distinct('continent', CountryModel.objects)

    def resolve_continent(parent, info, name):
        return value_if_in_distinct(name, 'continent', CountryModel.objects)

    # Region Resolvers
    def resolve_regions(parent, info):
        return get_distinct('region', CountryModel.objects)

    def resolve_region(parent, info, name):
        return value_if_in_distinct(name, 'region', CountryModel.objects)

    # Language Resolvers
    def resolve_languages(parent, info):
        return LanguageModel.objects.all()


# MUTATIONS

class NewCityInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    countrycode = graphene.String(required=True)
    district = graphene.String(required=True)
    population = graphene.Int(required=True)

class CityInput(graphene.InputObjectType):
    name = graphene.String()
    district = graphene.String()
    population = graphene.Int()

class CreateCity(graphene.Mutation):
    class Arguments:
        city_data = NewCityInput(required=True)

    city = graphene.Field(City)
    ok = graphene.Boolean()

    @staticmethod
    def mutate(parent, info, city_data=None):
        city = CityModel(
            name=city_data.name,
            countrycode=city_data.countrycode,
            district=city_data.district,
            population=city_data.population
        )
        city.save()
        return CreateCity(city=city, ok=True)

class UpdateCity(graphene.Mutation):
    class Arguments: 
        id = graphene.ID(required=True)
        city_data = CityInput(required=True)

    city = graphene.Field(City)
    ok = graphene.Boolean()

    @staticmethod
    def mutate(parent, info, id=None, city_data=None):
        city = CityModel.objects.get(id=id)
        for key, val in city_data.items():
            setattr(city, key, val)
        city.save()
        return UpdateCity(city=city, ok=True)

class DeleteCity(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(parent, info, id=None):
        city = CityModel.objects.get(id=id)
        city.delete()
        return DeleteCity(ok=True)

class Mutation(graphene.ObjectType):
    create_city = CreateCity.Field()
    update_city = UpdateCity.Field()
    delete_city = DeleteCity.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)