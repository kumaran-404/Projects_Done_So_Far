from rest_framework import fields, serializers 
from .models import Profile,Account
 
class profileSerializer(serializers.ModelSerializer):
    class Meta :
        model =Profile 
        fields="__all__"

class AccountSerializer(serializers.ModelSerializer):
    class Meta :
        model =Account
        fields="__all__"


class AccountViewSerializer(serializers.ModelSerializer):
    class Meta :
        model =Account
        fields=("account_name","first_name","last_name","account_id",)