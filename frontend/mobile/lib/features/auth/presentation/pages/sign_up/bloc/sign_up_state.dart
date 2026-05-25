part of 'sign_up_bloc.dart';

sealed class SignUpState extends Equatable {
  const SignUpState();

  @override
  List<Object?> get props => [];
}

final class SignUpInitial extends SignUpState {}

final class SignUpLoading extends SignUpState {}

class SignUpSuccess extends SignUpState {
  final String message;

  const SignUpSuccess({required this.message});

  @override
  List<Object?> get props => [message];
}

class SignUpFailure extends SignUpState {
  final Failure failure;

  const SignUpFailure({required this.failure});

  @override
  List<Object?> get props => [failure];
}
