// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format width=80

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:budgetro/core/di/di_module.dart' as _i707;
import 'package:budgetro/features/auth/data/datasources/remote/api_service.dart'
    as _i254;
import 'package:budgetro/features/auth/data/repository/auth_repository_impl.dart'
    as _i581;
import 'package:budgetro/features/auth/domain/repository/auth_repository.dart'
    as _i1016;
import 'package:budgetro/features/auth/domain/usecases/otp_login_usecase.dart'
    as _i965;
import 'package:budgetro/features/auth/domain/usecases/sign_up_usecase.dart'
    as _i838;
import 'package:budgetro/features/auth/presentation/pages/sign_up/bloc/sign_up_bloc.dart'
    as _i510;
import 'package:dio/dio.dart' as _i361;
import 'package:get_it/get_it.dart' as _i174;
import 'package:injectable/injectable.dart' as _i526;

extension GetItInjectableX on _i174.GetIt {
  // initializes the registration of main-scope dependencies inside of GetIt
  _i174.GetIt init({
    String? environment,
    _i526.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i526.GetItHelper(this, environment, environmentFilter);
    final diModule = _$DiModule();
    gh.lazySingleton<_i361.Dio>(() => diModule.dio());
    gh.lazySingleton<_i254.ApiService>(
      () => _i254.ApiService(
        gh<_i361.Dio>(),
        baseUrl: gh<String>(instanceName: 'baseUrl'),
      ),
    );
    gh.factory<String>(() => diModule.baseUrl(), instanceName: 'baseUrl');
    gh.lazySingleton<_i1016.AuthRepository>(
      () => _i581.AuthRepositoryImpl(gh<_i254.ApiService>()),
    );
    gh.factory<_i965.OtpLoginUsecase>(
      () => _i965.OtpLoginUsecase(gh<_i1016.AuthRepository>()),
    );
    gh.factory<_i838.SignUpUsecase>(
      () => _i838.SignUpUsecase(gh<_i1016.AuthRepository>()),
    );
    gh.factory<_i510.SignUpBloc>(
      () => _i510.SignUpBloc(gh<_i838.SignUpUsecase>()),
    );
    return this;
  }
}

class _$DiModule extends _i707.DiModule {}
