# Generated by Django 5.0 on 2024-01-25 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_review_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='administrator',
            name='name',
            field=models.CharField(default='dji', max_length=255),
        ),
    ]