# Generated by Django 4.0.5 on 2022-08-31 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='photo/')),
                ('title', models.CharField(max_length=120)),
                ('price', models.FloatField()),
                ('slug', models.SlugField()),
                ('description', models.TextField()),
                ('stock', models.IntegerField(default=10)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='product.category')),
            ],
            options={
                'verbose_name_plural': 'Products',
            },
        ),
    ]