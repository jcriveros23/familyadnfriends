#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "FAMILIA RIVEROS";
const char* password = "riveros2021";
const char* mqtt_server = "test.mosquitto.org";
const int mqtt_port = 1883;
char receivedMessage[256];
int ledPin = 13; // Pin GPIO 13
bool ledState = LOW; // Estado inicial del LED

void callback(char* topic, byte* payload, unsigned int length) {
  if(strcmp(topic, "familyandfriends/led") == 0){
      if (ledState == LOW) {
      ledState = HIGH;
    } else {
      ledState = LOW;
    }
    // Enciende o apaga el LED
    digitalWrite(ledPin, ledState);

  }
  Serial.print("Mensaje recibido en el tópico: ");
  Serial.println(topic);
  Serial.print("Contenido: ");
  
  // Copiar el mensaje recibido a la variable 'receivedMessage'
  for (int i = 0; i < length; i++) {
    receivedMessage[i] = (char)payload[i];
    Serial.print(receivedMessage[i]);
  }
  
  receivedMessage[length] = '\0'; // Agregar un carácter nulo al final del mensaje
  Serial.println();
}

WiFiClient wifiClient;
PubSubClient client(wifiClient);

long lastReconnectAttempt = 0;

boolean reconnect() {
  if (client.connect("esp32Client")) {
    // Una vez conectado, publica un anuncio...
    client.publish("familyandfriends/msg", "Hola mundo");
    // ... y resuscríbete
    client.subscribe("familyandfriends/#");
  }
  return client.connected();
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT); // Configura el pin del LED como salida

  // Conéctate a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a la red WiFi");

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  lastReconnectAttempt = 0;
}

void loop() {
  if (!client.connected()) {
    long now = millis();
    if (now - lastReconnectAttempt > 5000) {
      lastReconnectAttempt = now;
      // Intenta reconectar
      if (reconnect()) {
        lastReconnectAttempt = 0;
      }
    }
  } else {
    // Cliente conectado
    client.loop();
  }
}