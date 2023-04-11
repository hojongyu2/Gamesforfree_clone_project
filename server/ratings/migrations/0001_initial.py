# Generated by Django 4.2 on 2023-04-11 05:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('value', models.CharField(choices=[('like', 'Like'), ('neutral', 'Neutral'), ('dislike', 'Dislike')], max_length=10)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='all_ratings', to='games.game')),
            ],
        ),
    ]