import 'package:budgetro/core/enums/login_type.dart';
import 'package:json_annotation/json_annotation.dart';

part 'sign_up_request.g.dart';

@JsonSerializable()
class SignUpRequest {
  @JsonKey(name: 'identifier')
  final String identifier;
  @JsonKey(name: 'identifierType')
  final LoginType identifierType;
  @JsonKey(name: 'password')
  final String password;

  SignUpRequest({
    required this.identifier,
    required this.identifierType,
    required this.password,
  });

  Map<String, dynamic> toJson() => _$SignUpRequestToJson(this);
}
