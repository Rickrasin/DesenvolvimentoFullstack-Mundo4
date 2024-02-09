import 'package:flutter/material.dart';

class ButtonSection extends StatelessWidget {
  final Color color;
  final List<IconData> icons;
  final List<String> labels;

  const ButtonSection({
    super.key,
    required this.color,
    required this.icons,
    required this.labels,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildButtonColumn(color, icons[0], labels[0]),
        _buildButtonColumn(color, icons[1], labels[1]),
        _buildButtonColumn(color, icons[2], labels[2]),
      ],
    );
  }

  Column _buildButtonColumn(Color color, IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, color: color),
        Container(
          margin: const EdgeInsets.only(top: 8),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: color,
            ),
          ),
        ),
      ],
    );
  }
}
