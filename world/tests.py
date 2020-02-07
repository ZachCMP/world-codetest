import json

from graphene_django.utils.testing import GraphQLTestCase
from world.schema import schema
from django.test import TestCase
from django.db import connection

from world.models import City, Country, Countrylanguage

# Create your tests here.
class GraphQLTests(GraphQLTestCase):
  GRAPHQL_SCHEMA = schema
  GRAPHQL_URL = '/graphql'

  def setUp(self):
    super().setUp()
    # This is required to allow creation and deletion of un-managed models for the test cases
    with connection.schema_editor() as schema_editor:
      schema_editor.create_model(Country)
      schema_editor.create_model(Countrylanguage)
      if Country._meta.db_table not in connection.introspection.table_names():
        raise ValueError("Table `{table_name}` is missing in test database.".format(table_name=Country._meta.db_table))
      if Countrylanguage._meta.db_table not in connection.introspection.table_names():
        raise ValueError("Table `{table_name}` is missing in test database.".format(table_name=Countrylanguage._meta.db_table))

    def tearDown(self):
      super().tearDown()
      # This is required to allow creation and deletion of un-managed models for the test cases
      with connection.schema_editor() as schema_editor:
        schema_editor.delete_model(Country)
        schema_editor.delete_model(Countrylanguage)

    city = City.objects.create(
      id = 1, 
      name = 'Test', 
      district = 'Place', 
      population = 123, 
      countrycode = 'USA',
    )
    country = Country.objects.create(
      code = 'USA',
      name = 'United States',
      continent = 'North America',
      region = 'North America',
      surfacearea = 1234567,
      indepyear = 1776,
      population = 12345678,
      lifeexpectancy = 80.5,
      gnp = 12312312,
      gnpold = 23423412,
      localname = 'America',
      governmentform = 'Federal Republic',
      headofstate = 'The President',
      capital = city,
      code2 = 'US'
    )
    Countrylanguage.objects.create(
      countrycode = country,
      language = 'English',
      isofficial = True,
      percentage = 95,
    )
    Countrylanguage.objects.create(
      countrycode = country,
      language = 'Spanish',
      isofficial = False,
      percentage = 5,
    )

  def test_continents(self):
    response = self.query(
      '''
      query {
        continents {
          name
          regions {
            name
          }
        }
      }
      ''',
      op_name='cities'
    )
    content = json.loads(response.content)
    self.assertResponseNoErrors(response)
    self.assertDictEqual(
      content, 
      {
        'data': {
          'continents': [
            {
              'name': 'North America', 
              'regions': [
                {'name': 'North America'}
              ]
            }
          ]
        }
      }
    )
    
  def test_regions(self):
    response = self.query(
      '''
      query {
        continent(name: "North America") {
          name
          regions {
            name
          }
        }
      }
      ''',
      op_name='continent'
    )
    content = json.loads(response.content)
    self.assertResponseNoErrors(response)
    self.assertDictEqual(
      content, 
      {
        'data': {
          'continent': {
            'name': 'North America', 
            'regions': [
              {'name': 'North America'}
            ]
          }
        }
      }
    )

  def test_countries(self):
    response = self.query(
      '''
      query {
        region(name: "North America") {
          name
          countries {
            page
            pages
            count
            hasNext
            hasPrev
            objects {
              name
            }
          }
        }
      }
      ''',
      op_name='region'
    )
    content = json.loads(response.content)
    self.assertResponseNoErrors(response)
    self.assertDictEqual(
      content, 
      {
        'data': {
          'region': {
            'name': 'North America', 
            'countries': {
              'page': 1,
              'pages': 1,
              'count': 1,
              'hasNext': False,
              'hasPrev': False,
              'objects': [
                {
                  'name': 'United States'
                }
              ]
            }
          }
        }
      }
    )

  def test_country(self):
    response = self.query(
      '''
      query {
        country(code: "USA") {
          code
          name
          continent
          region
          surfacearea
          indepyear
          population
          lifeexpectancy
          gnp
          gnpold
          localname
          governmentform
          headofstate
          code2
          capital {
            id
            name
          }
          languages {
            language
            percentage
            isofficial
          }
        }
      }
      ''',
      op_name='region'
    )
    content = json.loads(response.content)
    self.assertResponseNoErrors(response)
    self.assertDictEqual(
      content, 
      {
        'data': {
          'country': {
            'code': 'USA',
            'name': 'United States',
            'continent': 'North America',
            'region': 'North America',
            'surfacearea': 1234567.0,
            'indepyear': 1776,
            'population': 12345678,
            'lifeexpectancy': 80.5,
            'gnp': 12312312.0,
            'gnpold': 23423412.0,
            'localname': 'America',
            'governmentform': 'Federal Republic',
            'headofstate': 'The President',
            'code2': 'US',
            'capital': {
              'id': '1',
              'name': 'Test'
            },
            'languages': [
              {
                'language': 'English',
                'isofficial': True,
                'percentage': 95.0
              },
              {
                'language': 'Spanish',
                'isofficial': False,
                'percentage': 5.0
              }
            ]
            
          }
        }
      }
    )

  def test_cities(self):
    response = self.query(
      '''
      query {
        country(code: "USA") {
          name
          cities {
            page
            pages
            count
            hasNext
            hasPrev
            objects {
              id
              name
            }
          }
        }
      }
      ''',
      op_name='country'
    )
    content = json.loads(response.content)
    self.assertResponseNoErrors(response)
    self.assertDictEqual(
      content, 
      {
        'data': {
          'country': {
            'name': 'United States', 
            'cities': {
              'page': 1,
              'pages': 1,
              'count': 1,
              'hasNext': False,
              'hasPrev': False,
              'objects': [
                {
                  'id': '1',
                  'name': 'Test'
                }
              ]
            }
          }
        }
      }
    )

  def test_city(self):
    response = self.query(
      '''
      query {
        city(id: "1") {
          id
          name
          district
          population
          countrycode
        }
      }
      ''',
      op_name='city'
    )
    content = json.loads(response.content)
    self.assertResponseNoErrors(response)
    self.assertDictEqual(
      content, 
      {
        'data': {
          'city': {
            'id': '1',
            'name': 'Test',
            'district': 'Place',
            'population': 123,
            'countrycode': 'USA'
          }
        }
      }
    )
      