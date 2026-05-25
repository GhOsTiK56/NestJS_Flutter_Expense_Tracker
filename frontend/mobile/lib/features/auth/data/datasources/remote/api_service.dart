import 'package:budgetro/features/auth/data/models/requests/otp_login_request.dart';
import 'package:budgetro/features/auth/data/models/requests/sign_up_request.dart';
import 'package:budgetro/features/auth/data/models/responses/otp_login_response.dart';
import 'package:budgetro/features/auth/data/models/responses/sign_up_response.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:retrofit/retrofit.dart';

part 'api_service.g.dart';

@lazySingleton
@RestApi()
abstract class ApiService {
  @factoryMethod
  factory ApiService(Dio dio, {@Named('baseUrl') String? baseUrl}) = _ApiService;

  @POST('/auth/sign-up')
  Future<SignUpResponse> signUp(@Body() SignUpRequest request);

  @POST('/auth/otp/send')
  Future<OtpLoginResponse> sendOtp(@Body() OtpLoginRequest request);
}