part of 'sign_up_bloc.dart';

sealed class SignUpEvent extends Equatable {
  const SignUpEvent();

  @override
  List<Object?> get props => [];
}

class SignUpSubmitted extends SignUpEvent {
  final String name;
  final String identifier;
  final LoginType type; 
  final String password;

  const SignUpSubmitted({
    required this.name,
    required this.identifier,
    required this.type,
    required this.password,
  });

  @override
  List<Object?> get props => [name, identifier, type, password];
}
