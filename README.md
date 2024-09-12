# Comments React Native App

## Реализованные фичи:

- Локальный логин. Пользователь не сохраняется между сессиями
- Валидация имени. Только цифры и буквы латинского алфавита.
- Валидация email.
- Добавление / удаление комментариев. Комментарии сохраняются между сессиями.
- Пагинация комментариев. По 25 на странице.
- Древовидное отображение комментариев.

## Требования для запуска проекта:

- [Окружение для React Native](https://reactnative.dev/docs/set-up-your-environment?platform=android)
- [Node.js](https://nodejs.org/) v20.5.0 и выше
- Android Studio Koala | 2024.1.1 и выше
- Xcode 15.4

## Установка

1. Клонируйте этот репозиторий:

```bash
git clone git@github.com:oleg-gulitsky/CommentsRNApp.git
```

2. Перейдите в папку проекта:

```bash
cd CommentsRNApp
```

3. Установите зависимости:

```bash
npm install
```

## Запуск приложения

Запустите Metro Bundler:

```bash
npx react-native start
```

### Android

1. Откройте проект (CommentsRNApp/android) в Android Studio
2. Запустить проект на эмуляторе или устройстве

### iOS

1. Перейдите в папку ios:

```
cd ios
```

2. Установите pod:

```bash
pod install
```

3. Откройте проект (CommentsRNApp/ios/CommentsRNApp.xcworkspace) в Xcode.

4. В разделе **Signing & Capabilities** убедитесь, что выбрана ваша личная или командная учетная запись разработчика.

5. Запустить проект на эмуляторе или устройстве
