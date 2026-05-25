import 'package:budgetro/core/error/error_handler.dart';
import 'package:budgetro/core/error/failure.dart';
import 'package:budgetro/features/auth/data/datasources/remote/api_service.dart';
import 'package:budgetro/features/auth/data/models/requests/otp_login_request.dart';
import 'package:budgetro/features/auth/data/models/requests/sign_up_request.dart';
import 'package:budgetro/features/auth/domain/repository/auth_repository.dart';
import 'package:fpdart/src/either.dart';
import 'package:injectable/injectable.dart';

@LazySingleton(as: AuthRepository)
class AuthRepositoryImpl implements AuthRepository {
  final ApiService _apiService;
  AuthRepositoryImpl(this._apiService);

  @override
  Future<Either<Failure, String>> signUp(SignUpRequest request) async {
    try {
      final response = await _apiService.signUp(request);
      if (response.ok) {
        return const Right('Success');
      }
      //TODO: По нормальному передать ошибку
      return Left(ErrorHandler.handleError('Registration Failed'));
    } catch (e) {
      return Left(ErrorHandler.handleError(e));
    }
  }

  @override
  Future<Either<Failure, String>> sendOtp(OtpLoginRequest request) async {
    try {
      final response = await _apiService.sendOtp(request);
      if (response.ok) {
        return const Right('Success');
      }
      return Left(ErrorHandler.handleError('SendOtp Failed'));
    } catch (e) {
      return Left(ErrorHandler.handleError(e));
    }
  }
}
