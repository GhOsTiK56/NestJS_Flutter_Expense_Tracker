import 'package:budgetro/core/error/failure.dart';
import 'package:budgetro/features/auth/data/models/requests/otp_login_request.dart';
import 'package:budgetro/features/auth/data/models/requests/sign_up_request.dart';
import 'package:fpdart/fpdart.dart';

abstract interface class AuthRepository {
  Future<Either<Failure, String>> signUp(SignUpRequest request);
  
  Future<Either<Failure, String>> sendOtp(OtpLoginRequest request);
}
