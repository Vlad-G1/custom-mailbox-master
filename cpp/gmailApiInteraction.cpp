#include <iostream>
#include <curl/curl.h> //Подключение необходимых заголовочных файлов для работы с вводом-выводом и библиотекой libcurl (находится проекте в "libs/libcurl").

// Функция обратного вызова для записи данных из ответа сервера
// Иначе говоря, эта функция нужна для библиотеки libcurl и используется при работе с HTTP-запросами (запрос данных - получение списка писем, получение содержимого определенного письма)
// без этой функции нельзя будет автоматически записывать данные из ответа сервера в строку.
// Это может привести к тому, что данные из ответа сервера не будут обработаны или не будут доступны для дальнейшей работы в программе.

size_t write_callback(void* contents, size_t size, size_t nmemb, std::string* buffer) {
    buffer->append((char*)contents, size * nmemb);
    return size * nmemb;
}

// Функция для отправки GET запроса (получить список писем, а так же содержимое конкретного письма). Создание объекта CURL для работы с HTTP-запросами.
std::string send_get_request(const char* url) {
    CURL* curl;
    CURLcode res;
    std::string buffer;

    curl = curl_easy_init();

    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &buffer);

        res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            std::cerr << "Failed to send GET request: " << curl_easy_strerror(res) << std::endl;
        }

        curl_easy_cleanup(curl);
    }

    return buffer;
}

// Функция для отправки POST запроса (отправка письма с почтой отправителя, заголовком и текстом письма). Создание объекта CURL для работы с HTTP-запросами.
void send_post_request(const char* url, const char* data) {
    CURL* curl;
    CURLcode res;

    curl = curl_easy_init();

    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);

        res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            std::cerr << "Failed to send POST request: " << curl_easy_strerror(res) << std::endl;
        }

        curl_easy_cleanup(curl);
    }
}

// Получение списка писем. Вызывает функцию отправки GET запроса для получения списка писем.
void getMessagesList(const std::string& userId) {
    std::string messagesList = send_get_request("https://www.googleapis.com/gmail/v1/users/" + userId + "/messages");
    // Обработка полученного списка писем
}

// Открытие содержимого письма.  Вызывает функцию отправки GET запроса для получения содержимого письма.
void openMessageContent(const std::string& userId, const std::string& messageId) {
    std::string messageContent = send_get_request("https://www.googleapis.com/gmail/v1/users/" + userId + "/messages/" + messageId);
    // Обработка содержимого письма
}

// Отправка письма. Формирует данные письма в формате JSON и вызывает функцию отправки POST запроса.
void sendMessage(const std::string& recipient, const std::string& subject, const std::string& message) {
    std::string emailData = "{\"to\": \"" + recipient + "\", \"subject\": \"" + subject + "\", \"message\": \"" + message + "\"}";
    send_post_request("https://www.googleapis.com/gmail/v1/users/me/messages/send", emailData.c_str());
}

// Удаление письма. Вызывает функцию отправки POST запроса для перемещения письма в корзину (в данном проекте выглядит так, будто бы письмо удалилось совсем)
void deleteMessage(const std::string& userId, const std::string& messageId) {
    send_post_request("https://www.googleapis.com/gmail/v1/users/" + userId + "/messages/" + messageId + "/trash", nullptr);
}

int main() {
    // Получаем список сообщений сразу после загрузки страницы, остальные функции вызываются по необходимости
    getMessagesList("me");
}