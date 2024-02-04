from django.core.exceptions import ValidationError


class CustomPasswordValidator():
    def __init__(self, min_length=1):
        self.min_length = min_length

    def validate(self, password, email):
        special_characters = "[~\\!@#\\$%\\^&\\*\\(\\)_\\+{}\":;'\\[\\]]"
        if not any(char.isdigit() for char in password):
            raise ValidationError(
                'Le mot de passe doit contenir au moins %(min_length)d chiffre.' % {'min_length': self.min_length})
        if not any(char.isupper() for char in password):
            raise ValidationError('Le mot de passe doit contenir au moins %(min_length)d lettre majuscule.' % {
                'min_length': self.min_length})
        if not any(char in special_characters for char in password):
            raise ValidationError('Le mot de passe doit contenir au moins  %(min_length)d caractère special.' % {
                'min_length': self.min_length})
        print('ee')

    def get_help_text(self):
        return ""
