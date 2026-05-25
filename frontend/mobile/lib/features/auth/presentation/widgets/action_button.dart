import 'package:budgetro/core/theme/app_text_styles.dart';
import 'package:flutter/material.dart';

class ActionButton extends StatelessWidget {
  const ActionButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.height = 56,
    this.width = 50,
    this.borderRadius = 10,
    this.icon,
  });

  final String text;
  final VoidCallback? onPressed;
  final double width;
  final double height;
  final double borderRadius;
  final Widget? icon;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        minimumSize: Size(width, height),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadiusGeometry.circular(borderRadius),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            SizedBox(
              width: 20,
              height: 20,
              child: FittedBox(fit: BoxFit.contain, child: icon!),
            ),
            const SizedBox(width: 8),
          ],
          Text(text, style: AppTextStyles.buttonTextStyle),
        ],
      ),
    );
  }
}
