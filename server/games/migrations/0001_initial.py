# Generated by Django 4.2 on 2023-04-11 05:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('thumbnail', models.URLField()),
                ('status', models.CharField(max_length=255)),
                ('short_description', models.TextField()),
                ('description', models.TextField()),
                ('game_url', models.URLField()),
                ('genre', models.CharField(max_length=50)),
                ('platform', models.CharField(max_length=50)),
                ('publisher', models.CharField(max_length=255)),
                ('developer', models.CharField(max_length=255)),
                ('release_Date', models.CharField(max_length=255)),
                ('freetogame_profile_url', models.URLField()),
                ('minumum_system_requirements', models.JSONField()),
                ('screenshots', models.JSONField()),
                ('video_play_back', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Favorite_game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('played', 'Played'), ('play_later', 'play later'), ('currently_playing', 'Currently playing')], max_length=50)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.game')),
            ],
        ),
    ]
