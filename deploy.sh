#!usr/bin/env sh

#остановить публикацию при ошибках
set -e

#сборка приложения
npm run build

#Переход в каталог сборки
cd dist

#Инициализация Репозитория и заргрука кода в Git hub
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/Archeeez/techzavr-app.git master:gh-pages 

cd -