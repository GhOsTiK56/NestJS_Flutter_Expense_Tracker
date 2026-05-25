import 'package:budgetro/core/di/di.dart';
import 'package:flutter/material.dart';
import 'package:budgetro/core/app.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: '.env');
  await configureDependencies();

  runApp(const ExpenseTrackerApp());
}
