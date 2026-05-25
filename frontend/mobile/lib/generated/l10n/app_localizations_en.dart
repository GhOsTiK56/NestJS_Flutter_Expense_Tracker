// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get signUpPage => 'Sign Up Page';

  @override
  String get logInPage => 'Log in Page';

  @override
  String get signUp => 'Sign Up';

  @override
  String get logIn => 'Login';

  @override
  String get logInPageText =>
      'To log in to the app, enter your Email and password.';

  @override
  String get signUpPageText =>
      'To Sign Up to the app, enter your Name, Email and password, or continue with Google or Yandex';

  @override
  String get name => 'First Name';

  @override
  String get email => 'Email';

  @override
  String get password => 'Password';

  @override
  String get nameHint => 'Enter First Name';

  @override
  String get emailHint => 'Enter Email Adress';

  @override
  String get passwordHint => 'Enter Password';

  @override
  String get emailInvalid => 'Please enter a valid Email adress';

  @override
  String get or => 'OR';

  @override
  String fieldRequired(String fieldName) {
    return '$fieldName is required';
  }

  @override
  String fieldTooShort(String fieldName, int charactersContains) {
    return '$fieldName must contain at least $charactersContains characters';
  }

  @override
  String nameLettersOnly(String fieldName) {
    return '$fieldName must contain only letters';
  }
}
