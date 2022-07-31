# Generated by Django 3.2.9 on 2022-01-06 05:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_auto_20211231_0612'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postcomment',
            name='commented_by',
        ),
        migrations.RemoveField(
            model_name='postcomment',
            name='post_id',
        ),
        migrations.RemoveField(
            model_name='postimage',
            name='post_id',
        ),
        migrations.RemoveField(
            model_name='postlike',
            name='liked_by',
        ),
        migrations.RemoveField(
            model_name='postlike',
            name='post_id',
        ),
        migrations.DeleteModel(
            name='Post',
        ),
        migrations.DeleteModel(
            name='PostComment',
        ),
        migrations.DeleteModel(
            name='PostImage',
        ),
        migrations.DeleteModel(
            name='PostLike',
        ),
    ]