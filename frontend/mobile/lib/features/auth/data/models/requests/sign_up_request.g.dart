// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sign_up_request.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SignUpRequest _$SignUpRequestFromJson(Map<String, dynamic> json) =>
    SignUpRequest(
      identifier: json['identifier'] as String,
      identifierType: $enumDecode(_$LoginTypeEnumMap, json['identifierType']),
      password: json['password'] as String,
    );

Map<String, dynamic> _$SignUpRequestToJson(SignUpRequest instance) =>
    <String, dynamic>{
      'identifier': instance.identifier,
      'identifierType': _$LoginTypeEnumMap[instance.identifierType]!,
      'password': instance.password,
    };

const _$LoginTypeEnumMap = {LoginType.email: 'email', LoginType.phone: 'phone'};
