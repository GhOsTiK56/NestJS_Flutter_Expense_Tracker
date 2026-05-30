import 'package:budgetro/core/enums/login_type.dart';
import 'package:budgetro/core/error/failure.dart';
import 'package:budgetro/features/auth/data/models/requests/sign_up_request.dart';
import 'package:budgetro/features/auth/domain/usecases/sign_up_usecase.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

part 'sign_up_event.dart';
part 'sign_up_state.dart';

@injectable
class SignUpBloc extends Bloc<SignUpEvent, SignUpState> {
  final SignUpUsecase signUpUsecase;

  SignUpBloc(this.signUpUsecase) : super(SignUpInitial()) {
    on<SignUpSubmitted>(_onSignUpSubmitted);
  }

  Future<void> _onSignUpSubmitted(
    SignUpSubmitted event,
    Emitter<SignUpState> emit,
  ) async {
    emit(SignUpLoading());
    final request = SignUpRequest(
      identifier: event.identifier,
      identifierType: event.type,
      password: event.password,
    );
    final result = await signUpUsecase.call(request);
    result.fold(
      (failure) {
        emit(SignUpFailure(failure: failure));
      },
      (message) {
        emit(SignUpSuccess(message: message));
      },
    );
  }
}
