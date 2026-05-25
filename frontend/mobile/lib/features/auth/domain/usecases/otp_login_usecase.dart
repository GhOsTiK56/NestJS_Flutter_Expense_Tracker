import 'package:budgetro/core/error/failure.dart';
import 'package:budgetro/features/auth/data/models/requests/otp_login_request.dart';
import 'package:budgetro/features/auth/domain/repository/auth_repository.dart';
import 'package:fpdart/fpdart.dart';
import 'package:injectable/injectable.dart';

@injectable
class OtpLoginUsecase {
  final AuthRepository _authRepository;

  OtpLoginUsecase(this._authRepository);

  Future<Either<Failure, String>> call(OtpLoginRequest request) async {
    return await _authRepository.sendOtp(request);
  }
}