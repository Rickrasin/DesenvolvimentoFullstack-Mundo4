import 'package:flutter/material.dart';

class TextSection extends StatelessWidget {
  final String text;

  const TextSection(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        text,
        softWrap: true,
      ),
    );
  }
}
