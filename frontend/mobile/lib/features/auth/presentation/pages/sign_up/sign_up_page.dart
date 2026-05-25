import 'package:budgetro/core/enums/login_type.dart';
import 'package:budgetro/core/extension/build_context_extensions.dart';
import 'package:budgetro/core/routing/rout_names.dart';
import 'package:budgetro/core/theme/app_colors.dart';
import 'package:budgetro/core/theme/app_text_styles.dart';
import 'package:budgetro/core/utils/validator_utility.dart';
import 'package:budgetro/features/auth/presentation/pages/sign_up/bloc/sign_up_bloc.dart';
import 'package:budgetro/features/auth/presentation/widgets/auth_password_text_field.dart';
import 'package:budgetro/features/auth/presentation/widgets/auth_text_field.dart';
import 'package:budgetro/features/auth/presentation/widgets/action_button.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final _nameController = TextEditingController(text: 'Karen');
  final _emailController = TextEditingController(text: 'Karen@gmail.com');
  final _passwordController = TextEditingController(text: '12345678');
  final _repeatPasswordController = TextEditingController(text: '12345678');
  final _formKey = GlobalKey<FormState>();
  final LoginType type = LoginType.email;
  //TODO: Разобраться с этой переменной, по моему она тут излишня
  // ignore: unused_field
  bool _isLoading = false;

  late SignUpBloc _bloc;

  @override
  void initState() {
    super.initState();
    _bloc = GetIt.instance<SignUpBloc>();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _repeatPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignUp() async {
    final isValid = _formKey.currentState!.validate();
    if (!isValid) return;

    _bloc.add(
      SignUpSubmitted(
        name: _nameController.text,
        identifier: _emailController.text.trim().toLowerCase(),
        type: type,
        password: _passwordController.text,
      ),
    );

    // TODO: Это не работает потому что я отправил данные на сервер и должен дождаться от него ответа, чтобы войти, но сейчас, я перехожу на другую страницу моментально, не дождавшись ответа от сервера
  }

  void _handleSignUpState(SignUpState state) {
    if (state is SignUpLoading) {
      setState(() {
        _isLoading = true;
      });
    } else if (state is SignUpSuccess) {
      setState(() {
        _isLoading = false;
      });
      context.push(Routes.otp);
    } else if (state is SignUpFailure) {
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _toLoginPage() {
    context.go(Routes.login);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(),
      backgroundColor: theme.colorScheme.surface,
      body: BlocConsumer<SignUpBloc, SignUpState>(
        bloc: _bloc,
        listener: (context, state) {
          _handleSignUpState(state);
        },
        builder: (context, state) {
          return SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(15),
                child: Column(
                  children: [
                    // Log In Page Display Text
                    Text(
                      context.l10n.signUpPage,
                      style: AppTextStyles.displayMedium,
                      textAlign: TextAlign.center,
                    ),

                    // Log In Page Headline Text
                    Text(
                      context.l10n.signUpPageText,
                      style: AppTextStyles.titleLarge.copyWith(
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
                          child: Divider(
                            thickness: 1,
                            color: AppColors.greyColor,
                          ),
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
                          child: Divider(
                            thickness: 1,
                            color: AppColors.greyColor,
                          ),
                        ),
                      ],
                    ),

                    SizedBox(height: 30),

                    // Форма регистрации
                    Form(
                      key: _formKey,
                      child: Column(
                        children: [
                          // First Name Text Field
                          AuthTextField(
                            controller: _nameController,
                            labelText: context.l10n.name,
                            hintText: context.l10n.nameHint,
                            prefixIcon: Icons.person,
                            textCapitalization: TextCapitalization.words,
                            textInputAction: TextInputAction.next,
                            validator: (value) => ValidatorUtility.validateName(
                              value,
                              context.l10n.name,
                              context,
                            ),
                          ),
                          const SizedBox(height: 20),

                          // Email Text Field
                          AuthTextField(
                            controller: _emailController,
                            labelText: context.l10n.email,
                            hintText: context.l10n.emailHint,
                            prefixIcon: Icons.alternate_email,
                            keyboardType: TextInputType.emailAddress,
                            textInputAction: TextInputAction.next,
                            validator: (value) =>
                                ValidatorUtility.validateEmail(
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
                            validator: (value) =>
                                ValidatorUtility.validatePassword(
                                  value,
                                  context.l10n.password,
                                  context,
                                ),
                          ),
                          const SizedBox(height: 20),

                          // TODO: Добавить локализацию
                          AuthPasswordTextField(
                            controller: _repeatPasswordController,
                            labelText: 'Repeat Password',
                            hintText: 'Repeat Password',
                            prefixIcon: Icons.paste_sharp,
                            validator: (value) =>
                                ValidatorUtility.validatePassword(
                                  value,
                                  'Password',
                                  context,
                                ),
                          ),
                          const SizedBox(height: 20),

                          // Captcha
                          ElevatedButton(
                            onPressed: () {},
                            child: Text('Место под капчу'),
                          ),

                          const SizedBox(height: 20),

                          // Confirm Button & To Login
                          ActionButton(
                            text: context.l10n.signUp,
                            onPressed: _handleSignUp,
                          ),
                          const SizedBox(height: 20),

                          // Button to Login
                          RichText(
                            text: TextSpan(
                              text: 'Already have an account? ',
                              style: AppTextStyles.textSpanStyle,
                              children: [
                                TextSpan(
                                  text: 'Login',
                                  style: AppTextStyles.textSpanStyle.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                                  recognizer: TapGestureRecognizer()
                                    ..onTap = _toLoginPage,
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
          );
        },
      ),
    );
  }
}
