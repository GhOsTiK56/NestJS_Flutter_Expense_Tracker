import 'package:budgetro/core/theme/app_text_styles.dart';
import 'package:budgetro/features/auth/presentation/widgets/action_button.dart';
import 'package:budgetro/features/auth/presentation/widgets/auth_text_field.dart';
import 'package:flutter/material.dart';

class OtpPage extends StatefulWidget {
  const OtpPage({super.key});

  @override
  State<OtpPage> createState() => _OtpPageState();
}

class _OtpPageState extends State<OtpPage> {
  final _otpController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    _otpController.dispose();
    super.dispose();
  }

  Future<void> _handleSignUp() async {
    final isValid = _formKey.currentState!.validate();
    if (!isValid) return;
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
                Text(
                  'OTP Page',
                  style: AppTextStyles.displayMedium,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),

                // Форма регистрации
                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      AuthTextField(
                        controller: _otpController,
                        labelText: 'OTP code',
                        hintText: 'OTP code',
                        prefixIcon: Icons.cloud_done_rounded,
                        keyboardType: TextInputType.number,
                        textInputAction: TextInputAction.next,
                        validator: null,
                      ),
                      const SizedBox(height: 20),

                      // Confirm Button & To Login
                      ActionButton(
                        text: 'send',
                        onPressed: _handleSignUp,
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
