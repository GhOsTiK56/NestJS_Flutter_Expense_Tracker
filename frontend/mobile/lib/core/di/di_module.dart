import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:injectable/injectable.dart';

@module
abstract class DiModule {
  @lazySingleton
  Dio dio() {
    final dio = Dio();
    dio.interceptors.add(LogInterceptor(requestBody: true, responseBody: true));
    return dio;
  }

  @Named('baseUrl')
  String baseUrl() => dotenv.env['BASE_URL'] ?? '';
}
