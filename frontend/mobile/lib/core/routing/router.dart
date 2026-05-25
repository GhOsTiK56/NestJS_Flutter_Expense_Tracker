import 'package:budgetro/features/auth/presentation/pages/otp/otp_page.dart';
import 'package:budgetro/features/auth/presentation/pages/recover/recover_password_page.dart';
import 'package:go_router/go_router.dart';
import 'package:budgetro/core/routing/rout_names.dart';
import 'package:budgetro/features/auth/presentation/pages/log_in/login_page.dart';
import 'package:budgetro/features/auth/presentation/pages/sign_up/sign_up_page.dart';
import 'package:budgetro/features/home/presentation/home_page.dart';
import 'package:budgetro/features/splash/presentation/pages/splash_page.dart';

final appRouter = GoRouter(
  initialLocation: Routes.splash,
  routes: [
    GoRoute(
      path: Routes.splash,
      builder: (context, state) => const SplashPage(),
    ),
    GoRoute(path: Routes.login, builder: (context, state) => const LoginPage()),
    GoRoute(path: Routes.otp, builder: (context, state) => const OtpPage()),
    GoRoute(
      path: Routes.signUp,
      builder: (context, state) => const SignUpPage(),
    ),
    GoRoute(
      path: Routes.recoverPassword,
      builder: (context, state) => const RecoverPasswordPage(),
    ),
    GoRoute(path: Routes.home, builder: (context, state) => const HomePage()),
  ],
);
