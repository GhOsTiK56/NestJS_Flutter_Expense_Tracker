import 'package:budgetro/core/error/failure.dart';
import 'package:budgetro/features/auth/data/models/requests/sign_up_request.dart';
import 'package:budgetro/features/auth/domain/repository/auth_repository.dart';
import 'package:fpdart/fpdart.dart';
import 'package:injectable/injectable.dart';

@injectable
class SignUpUsecase {
  final AuthRepository _authRepository;

  SignUpUsecase(this._authRepository);

  Future<Either<Failure, String>> call(SignUpRequest request) async {
    return await _authRepository.signUp(request);
  }
}
