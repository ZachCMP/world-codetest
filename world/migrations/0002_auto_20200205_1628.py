# Generated by Django 3.0.3 on 2020-02-05 16:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CountryModel',
            fields=[
                ('code', models.CharField(max_length=3, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('continent', models.TextField()),
                ('region', models.TextField()),
                ('surfacearea', models.FloatField()),
                ('indepyear', models.SmallIntegerField(blank=True, null=True)),
                ('population', models.IntegerField()),
                ('lifeexpectancy', models.FloatField(blank=True, null=True)),
                ('gnp', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('gnpold', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('localname', models.TextField()),
                ('governmentform', models.TextField()),
                ('headofstate', models.TextField(blank=True, null=True)),
                ('code2', models.CharField(max_length=2)),
            ],
            options={
                'db_table': 'country',
                'managed': False,
            },
        ),
        migrations.RemoveField(
            model_name='countrylanguage',
            name='countrycode',
        ),
        migrations.CreateModel(
            name='CountrylanguageModel',
            fields=[
                ('countrycode', models.OneToOneField(db_column='countrycode', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='world.CountryModel')),
                ('language', models.TextField()),
                ('isofficial', models.BooleanField()),
                ('percentage', models.FloatField()),
            ],
            options={
                'db_table': 'countrylanguage',
                'managed': False,
            },
        ),
        migrations.RenameModel(
            old_name='City',
            new_name='CityModel',
        ),
        migrations.DeleteModel(
            name='Country',
        ),
        migrations.DeleteModel(
            name='Countrylanguage',
        ),
    ]
