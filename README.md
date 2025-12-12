Для запуска проекта нужен установленный Docker desktop, в корне проекта создать файл .env, данные для файла в телеграмме.
<img width="1918" height="560" alt="image" src="https://github.com/user-attachments/assets/41c211ec-7f3f-4bf2-8ddf-89aef0ba35b4" />
<img width="1919" height="489" alt="image" src="https://github.com/user-attachments/assets/6fd8a3ed-0495-4a5e-ae86-a6de0c7cacce" />


### Первый запуск

При первом запуске необходимо создать root юзера, с которого мы уже сможем создать других юзеров.
Для этого делаем следующее:

1. Для начала собираем jarы - запускаем в корне `mvn clean package`
2. Придумываем или генерируем пароль рута
3. Создаем хэш пароля `java -jar passwordtool/target/passwordtool-0.0.1-SNAPSHOT.jar theSecretPassword` - вместо theSecretPassword подставим свой пароль
4. При первом запуске в env бэкэнда подставляем `ROOT_USER_PASSWORD=$2a$10$v2ulc...` (в качестве значения перемнной хэщ пароля, полученный ранее)

Таким образом, если в БД нет пользователя `root` liquibase создаст пользователя с указанным паролем. После первого запуск
переменную `ROOT_USER_PASSWORD` можно убрать, но не обязательно.

Такой способ позволяет не хранить пароль root-а в открытом виде нигде и не передавать его.

## Тестирование связи Employee-Login 

Создан тест EmployeeLoginIntegrationTest.
Тест запускается из папки app/ систменоустановленным Maven.
Версия Java в системе должна соотвесвовать версии Java проекта.
Для запуска теста нужен docker. 
Запускается тестовый конетейнер с postgresql. Запускается тест.
После теста контейнер удаляется.
В docker при этом остается образ(image) testcontainers/ryuk, понадобится для других тестов в будущем вероятно. 

Команды запуска теста из папки app/:

```mvn test -Dtest=EmployeeLoginIntegrationTest```

Или:

```JAVA_HOME=<полный путь до папки с JDK 21> mvn test -Dtest=EmployeeLoginIntegrationTest```

