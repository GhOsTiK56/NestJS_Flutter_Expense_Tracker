import 'package:json_annotation/json_annotation.dart';

part 'otp_login_response.g.dart';

@JsonSerializable(genericArgumentFactories: true)
class OtpLoginResponse {
  @JsonKey(name: 'ok')
  final bool ok;

  OtpLoginResponse({required this.ok});

  factory OtpLoginResponse.fromJson(Map<String, dynamic> json) => _$OtpLoginResponseFromJson(json);
}