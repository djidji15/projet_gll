# Generated by Django 5.0 on 2024-01-26 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_administrator_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='administrator',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]
