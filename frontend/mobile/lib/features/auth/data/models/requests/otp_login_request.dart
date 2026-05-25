import 'package:budgetro/core/enums/login_type.dart';
import 'package:json_annotation/json_annotation.dart';

part 'otp_login_request.g.dart';

@JsonSerializable()
class OtpLoginRequest {
  @JsonKey(name: 'identifier')
  final String value;
  @JsonKey(name: 'type')
  final LoginType type;

  OtpLoginRequest({required this.value, required this.type});

  Map<String, dynamic> toJson() => _$OtpLoginRequestToJson(this);
}


