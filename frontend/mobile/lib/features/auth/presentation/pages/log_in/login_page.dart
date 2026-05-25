import 'dart:developer';

import 'package:budgetro/core/extension/build_context_extensions.dart';
import 'package:budgetro/core/routing/rout_names.dart';
import 'package:budgetro/core/theme/app_colors.dart';
import 'package:budgetro/core/theme/app_text_styles.dart';
import 'package:budgetro/core/utils/validator_utility.dart';
import 'package:budgetro/features/auth/presentation/widgets/auth_password_text_field.dart';
import 'package:budgetro/features/auth/presentation/widgets/auth_text_field.dart';
import 'package:budgetro/features/auth/presentation/widgets/action_button.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController(text: 'karen@gmail.com');
  final _passwordController = TextEditingController(text: '12345678');
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  void dispose() {
    // TODO Добавить смену Email на телефон
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() {
    final isValid = _formKey.currentState!.validate();
    if (!isValid) return;

    log(
      '${_emailController.text} '
      '${_passwordController.text}',
    );
  }

  void _toSignUpPage() {
    context.push(Routes.signUp);
  }

  void _toRecoverPage() {
    context.push(Routes.recoverPassword);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(),
      backgroundColor: theme.colorScheme.surface,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: EdgeInsets.all(15),
            child: Column(
              children: [
                // Log In Page Display Text
                Text(
                  context.l10n.logInPage,
                  style: AppTextStyles.displayLarge,
                  textAlign: TextAlign.center,
                ),

                // Log In Page Headline Text
                Text(
                  context.l10n.logInPageText,
                  style: AppTextStyles.headlineSmall.copyWith(
                    color: AppColors.greyColor,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),

                // Строка c кнопками Google & Yandex
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ActionButton(
                      text: 'Google',
                      borderRadius: 20,
                      icon: Image.asset('assets/icons/google.png'),
                      onPressed: () {},
                    ),
                    SizedBox(width: 10),

                    ActionButton(
                      text: 'Yandex',
                      borderRadius: 20,
                      icon: Image.asset('assets/icons/yandex.png'),
                      onPressed: () {},
                    ),
                  ],
                ),
                SizedBox(height: 30),

                Row(
                  children: [
                    Expanded(
                      child: Divider(thickness: 1, color: AppColors.greyColor),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 12),
                      child: Text(
                        context.l10n.or,
                        style: AppTextStyles.titleMedium.copyWith(
                          color: AppColors.greyColor,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Divider(thickness: 1, color: AppColors.greyColor),
                    ),
                  ],
                ),

                SizedBox(height: 30),

                // Форма регистрации
                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      // Email Text Field
                      AuthTextField(
                        controller: _emailController,
                        labelText: context.l10n.email,
                        hintText: context.l10n.emailHint,
                        prefixIcon: Icons.alternate_email,
                        keyboardType: TextInputType.emailAddress,
                        textInputAction: TextInputAction.next,
                        validator: (value) => ValidatorUtility.validateEmail(
                          value,
                          context.l10n.email,
                          context,
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Password Text Field
                      AuthPasswordTextField(
                        controller: _passwordController,
                        labelText: context.l10n.password,
                        hintText: context.l10n.passwordHint,
                        prefixIcon: Icons.password,
                        textInputAction: TextInputAction.done,
                        onFieldSubmitted: (_) => _handleLogin(),
                        validator: (value) => ValidatorUtility.validatePassword(
                          value,
                          context.l10n.password,
                          context,
                        ),
                      ),
                      const SizedBox(height: 20),

                      ElevatedButton(
                        onPressed: () {},
                        child: Text('Место под капчу'),
                      ),

                      const SizedBox(height: 20),
                      // Button to Sign Up
                      RichText(
                        text: TextSpan(
                          // TODO: заменить текст на генерацию
                          text: 'Forgot your password? ',
                          style: AppTextStyles.textSpanStyle,
                          children: [
                            TextSpan(
                              text: 'Recover',
                              style: AppTextStyles.textSpanStyle.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                              recognizer: TapGestureRecognizer()
                                ..onTap = () => _toRecoverPage(),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Confirm Button & To Home Page
                      ActionButton(
                        text: context.l10n.logIn,
                        onPressed: _handleLogin,
                      ),
                      const SizedBox(height: 20),

                      // Button to Sign Up
                      RichText(
                        text: TextSpan(
                          text: 'Don\'t have an account? ',
                          style: AppTextStyles.textSpanStyle,
                          children: [
                            TextSpan(
                              text: 'Sign Up',
                              style: AppTextStyles.textSpanStyle.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                              recognizer: TapGestureRecognizer()
                                ..onTap = () => _toSignUpPage(),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
