import 'package:json_annotation/json_annotation.dart';

part 'sign_up_response.g.dart';

@JsonSerializable(genericArgumentFactories: true)
class SignUpResponse {
  @JsonKey(name: 'ok') 
  final bool ok;

  SignUpResponse({required this.ok}); 

  factory SignUpResponse.fromJson(
    Map<String, dynamic> json)
    => _$SignUpResponseFromJson(json);
}