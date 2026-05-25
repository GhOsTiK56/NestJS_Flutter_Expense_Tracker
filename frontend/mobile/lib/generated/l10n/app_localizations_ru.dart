// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Russian (`ru`).
class AppLocalizationsRu extends AppLocalizations {
  AppLocalizationsRu([String locale = 'ru']) : super(locale);

  @override
  String get signUpPage => 'Страница Регистрации';

  @override
  String get logInPage => 'Страница Входа';

  @override
  String get signUp => 'Зарегистрироваться';

  @override
  String get logIn => 'Войти';

  @override
  String get logInPageText =>
      'Чтобы войти в приложение введите ваш Email и пароль';

  @override
  String get signUpPageText =>
      'Чтобы зарегестрироваться в приложении введите ваше Имя, пароль и Email';

  @override
  String get name => 'Имя';

  @override
  String get email => 'Почта';

  @override
  String get password => 'Пароль';

  @override
  String get nameHint => 'Введите Имя';

  @override
  String get emailHint => 'Введите Адрес Эл. Почты';

  @override
  String get passwordHint => 'Введите Пароль';

  @override
  String get emailInvalid => 'Введите правильный Email адрес';

  @override
  String get or => 'ИЛИ';

  @override
  String fieldRequired(String fieldName) {
    return 'Требуется ввести поле $fieldName';
  }

  @override
  String fieldTooShort(String fieldName, int charactersContains) {
    return 'Поле должно содержать как минимум 2 символа';
  }

  @override
  String nameLettersOnly(String fieldName) {
    return 'Поле должно содержать только буквы';
  }
}
