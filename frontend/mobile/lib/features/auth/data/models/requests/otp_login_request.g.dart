// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'otp_login_request.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

OtpLoginRequest _$OtpLoginRequestFromJson(Map<String, dynamic> json) =>
    OtpLoginRequest(
      value: json['identifier'] as String,
      type: $enumDecode(_$LoginTypeEnumMap, json['type']),
    );

Map<String, dynamic> _$OtpLoginRequestToJson(OtpLoginRequest instance) =>
    <String, dynamic>{
      'identifier': instance.value,
      'type': _$LoginTypeEnumMap[instance.type]!,
    };

const _$LoginTypeEnumMap = {LoginType.email: 'email', LoginType.phone: 'phone'};
