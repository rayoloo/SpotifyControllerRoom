# Generated by Django 3.2.5 on 2021-09-14 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_rename_token_spotifytoken_token_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(max_length=150, null=True),
        ),
    ]
