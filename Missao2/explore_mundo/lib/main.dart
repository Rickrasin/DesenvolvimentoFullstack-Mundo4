import 'package:flutter/material.dart';

import 'widgets/button_section.dart';
import 'widgets/text_section.dart';
import 'widgets/title_section.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Explore Mundo',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Explore Mundo'),
        ),
        body: ListView(
          children: [
            Image.asset(
              'assets/images/gotham.png',
              height: 240,
              fit: BoxFit.cover,
            ),
            const TitleSection(
                title: 'Gotham City', subtitle: 'Fictitious location'),
            ButtonSection(
              color: Theme.of(context).primaryColor,
              icons: const [
                Icons.call,
                Icons.near_me,
                Icons.share,
              ],
              labels: const ['CALL', 'ROUTE', 'SHARE'],
            ),
            const TextSection(
                'Gotham City é uma cidade fictícia dos quadrinhos da DC Comics, conhecida por ser o lar do super-herói Batman. Caracteriza-se por seus arranha-céus imponentes, becos escuros e uma atmosfera sombria. É uma cidade cheia de mistérios e perigos, onde o Batman luta contra o crime para proteger seus cidadãos.'),
          ],
        ),
      ),
    );
  }
}
