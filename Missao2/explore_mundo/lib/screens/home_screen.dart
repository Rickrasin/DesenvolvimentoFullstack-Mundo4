// home_screen.dart
import 'package:flutter/material.dart';

import 'package:explore_mundo/widgets/title_section.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
s      body: ListView(
        children: const [
          TitleSectionWidget(),
          // ... outros widgets
        ],
      ),
    );
  }
}
