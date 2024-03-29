# Generated by Django 3.2.5 on 2021-09-16 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0004_vote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='user',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='vote',
            name='user',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
