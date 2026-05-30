part of 'sign_up_bloc.dart';

sealed class SignUpEvent extends Equatable {
  const SignUpEvent();

  @override
  List<Object?> get props => [];
}

class SignUpSubmitted extends SignUpEvent {
  final String identifier;
  final LoginType type; 
  final String password;

  const SignUpSubmitted({
    required this.identifier,
    required this.type,
    required this.password,
  });

  @override
  List<Object?> get props => [identifier, type, password];
}
