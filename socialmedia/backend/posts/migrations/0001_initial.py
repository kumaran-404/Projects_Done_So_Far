# Generated by Django 3.2.9 on 2022-01-06 05:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('backend', '0008_auto_20220106_0514'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('post_id', models.IntegerField(primary_key=True, serialize=False)),
                ('post_type', models.CharField(max_length=1)),
                ('post_text', models.CharField(max_length=1000)),
                ('posted_at', models.DateTimeField(auto_now=True)),
                ('acct_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.account')),
            ],
        ),
        migrations.CreateModel(
            name='PostLike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked_at', models.DateTimeField(auto_now_add=True)),
                ('liked_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.account')),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.post')),
            ],
        ),
        migrations.CreateModel(
            name='PostImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='posts/')),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.post')),
            ],
        ),
        migrations.CreateModel(
            name='PostComment',
            fields=[
                ('comment_id', models.IntegerField(primary_key=True, serialize=False)),
                ('liked_at', models.DateTimeField(auto_now_add=True)),
                ('commented_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.account')),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.post')),
            ],
        ),
    ]
